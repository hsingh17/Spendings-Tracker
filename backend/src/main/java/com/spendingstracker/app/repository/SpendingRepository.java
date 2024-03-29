package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.Spending;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING_USER_AGGR</code>
 * table.
 */
@Repository
public interface SpendingRepository extends JpaRepository<Spending, BigInteger> {}
