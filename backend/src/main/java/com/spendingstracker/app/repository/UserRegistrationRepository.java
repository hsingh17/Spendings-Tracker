package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.UserRegistration;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.USER_REGISTRATION</code> table.
 */
@Repository
public interface UserRegistrationRepository extends CrudRepository<UserRegistration, BigInteger> {}
