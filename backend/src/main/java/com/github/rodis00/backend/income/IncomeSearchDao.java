package com.github.rodis00.backend.income;

import com.github.rodis00.backend.entity.IncomeEntity;
import com.github.rodis00.backend.entity.IncomeEntity_;
import com.github.rodis00.backend.entity.UserEntity_;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class IncomeSearchDao {

    private final EntityManager em;

    public IncomeSearchDao(EntityManager em) {
        this.em = em;
    }

    public List<IncomeEntity> findAllByUsernameYearAndMonth(
            String username,
            Integer year,
            Integer month
    ) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<IncomeEntity> criteriaQuery = cb.createQuery(IncomeEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        // select * from income
        Root<IncomeEntity> income = criteriaQuery.from(IncomeEntity.class);

        // where income.user.username = 'username'
        Predicate userPredicate = cb.equal(
                income.get(IncomeEntity_.USER).get(UserEntity_.USERNAME), username
        );

        predicates.add(userPredicate);

        if (Objects.nonNull(year)) {
            // and income.date_part('year', income.date) = year
            Predicate yearPredicate = cb.equal(
                    cb.function("date_part", Integer.class, cb.literal("year"), income.get(IncomeEntity_.DATE)),
                    year
            );
            predicates.add(yearPredicate);
        }

        if (Objects.nonNull(month)) {
            // and income.date_part('month', income.date) = month
            Predicate monthPredicate = cb.equal(
                    cb.function("date_part", Integer.class, cb.literal("month"), income.get(IncomeEntity_.DATE)),
                    month
            );
            predicates.add(monthPredicate);
        }

        /*
            select * from income where income.user.username = 'username'
            and income.date_part('year', income.date) = year
            and income.date_part('month', income.date) = month
        */
        criteriaQuery.where(cb.and(predicates.toArray(new Predicate[0])));

        return em.createQuery(criteriaQuery).getResultList();
    }
}
