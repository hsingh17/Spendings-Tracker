package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface SpendingRepository extends JpaRepository<Spending, Integer> {

    @Query(value =
              "SELECT "
            + " S.* "
            + "FROM "
            + " APP.SPENDINGS S "
            + "WHERE "
            + "     S.SPENDING_DATE >= :startDate "
            + " AND S.SPENDING_DATE <= :endDate "
            + " AND S.USER_ID = :userId "
            + "ORDER BY "
            + " SPENDING_DATE DESC ",
            countQuery =
              "SELECT "
            + " COUNT(*) "
            + "FROM "
            + " APP.SPENDINGS S "
            + "WHERE "
            + "     S.SPENDING_DATE >= :startDate "
            + " AND S.SPENDING_DATE <= :endDate "
            + " AND S.USER_ID = :userId "
            + "ORDER BY "
            + " SPENDING_DATE DESC ",
            nativeQuery = true)
    Page<Spending> findSpendingsBetweenDate(@Param("userId") Integer userId,
                                            @Param("startDate") Date startDate,
                                            @Param("endDate") Date endDate,
                                            Pageable pageable);
}
