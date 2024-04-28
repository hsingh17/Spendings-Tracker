package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.UserPasswordReset;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.USER_PASSWORD_RESET</code>
 * table.
 *
 * @see UserPasswordReset
 */
@Repository
public interface UserPasswordResetRepository
        extends CrudRepository<UserPasswordReset, BigInteger> {}
