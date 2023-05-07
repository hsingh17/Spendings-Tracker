package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.SpendingUserAggr;
import com.spendingstracker.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface SpendingUserAggrRepository extends JpaRepository<SpendingUserAggr, Long> {

    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, Date date);

    @Query(value =
              "SELECT "
            + " SUA.* "
            + "FROM "
            + " APP.SPENDING_USER_AGGR SUA "
            + "WHERE "
            + "     SUA.DATE >= :startDate "
            + " AND SUA.DATE <= :endDate "
            + " AND SUA.USER_ID = :userId "
            + "ORDER BY "
            + " SUA.DATE DESC ",
            countQuery =
              "SELECT "
            + " COUNT(*) "
            + "FROM "
            + " APP.SPENDING_USER_AGGR SUA "
            + "WHERE "
            + "     SUA.DATE >= :startDate "
            + " AND SUA.DATE <= :endDate "
            + " AND SUA.USER_ID = :userId "
            + "ORDER BY "
            + " SUA.DATE DESC ",
            nativeQuery = true)
    Page<SpendingUserAggr> findSpendingsBetweenDate(@Param("userId") Long userId,
                                                    @Param("startDate") Date startDate,
                                                    @Param("endDate") Date endDate,
                                                    Pageable pageable);
}
