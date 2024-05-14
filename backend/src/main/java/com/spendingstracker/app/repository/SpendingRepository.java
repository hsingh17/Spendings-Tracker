package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.Spending;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING</code> table.
 *
 * @see Spending
 */
@Repository
public interface SpendingRepository extends CrudRepository<Spending, BigInteger> {}
