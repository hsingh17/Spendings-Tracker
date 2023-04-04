package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

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
            + " S.SPENDING_DATE DESC ",
            nativeQuery = true)
    List<Spending> findSpendingsBetweenDate(@Param("userId") Integer userId,
                                            @Param("startDate") Date startDate,
                                            @Param("endDate") Date endDate);
    @Modifying
    @Transactional
    @Query(value =
              "DELETE FROM "
            + "    APP.SPENDINGS S "
            + "WHERE "
            + "        S.USER_ID = :userId "
            + "    AND S.SPENDING_DATE = :date ",
    nativeQuery = true)
    int deleteByDate(@Param("userId") Integer userId, @Param("date") Date spendingDate);
}
