package com.github.rodis00.backend.token;

import com.github.rodis00.backend.entity.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<TokenEntity, Long> {
    @Query(" select t from TokenEntity t " +
            "inner join UserEntity u " +
            "on t.user.id = u.id " +
            "where u.id = :userId " +
            "and (t.expired = false or t.revoked = false) "
    )
    List<TokenEntity> findAllValidTokenByUser(Long userId);

    Optional<TokenEntity> findByToken(String token);
}
