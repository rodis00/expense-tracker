package com.github.rodis00.backend.expense;

import com.github.rodis00.backend.entity.ExpenseEntity;
import com.github.rodis00.backend.entity.ExpenseEntity_;
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
public class ExpenseSearchDao {

    private final EntityManager em;

    public ExpenseSearchDao(EntityManager em) {
        this.em = em;
    }

    public List<ExpenseEntity> findAllByUsernameYearAndMonth(String username, Integer year, Integer month) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<ExpenseEntity> criteriaQuery = cb.createQuery(ExpenseEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        Root<ExpenseEntity> expense = criteriaQuery.from(ExpenseEntity.class);

        Predicate userPredicate = cb.equal(
                expense.get(ExpenseEntity_.USER).get(UserEntity_.USERNAME), username
        );

        predicates.add(userPredicate);

        if (Objects.nonNull(year)) {
            Predicate yearPredicate = cb.equal(
                    cb.function("date_part", Integer.class, cb.literal("year"), expense.get(ExpenseEntity_.DATE)),
                    year
            );
            predicates.add(yearPredicate);
        }

        if (Objects.nonNull(month)) {
            Predicate monthPredicate = cb.equal(
                    cb.function("date_part", Integer.class, cb.literal("month"), expense.get(ExpenseEntity_.DATE)),
                    month
            );
            predicates.add(monthPredicate);
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(criteriaQuery).getResultList();
    }
}
