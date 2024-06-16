package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.UserRegistration;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING_CATEGORY</code> table.
 *
 * @see SpendingCategory
 */
@Repository
public interface SpendingCategoryRepository extends CrudRepository<SpendingCategory, BigInteger> {}
