package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.Email;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP.EMAIL</code> table.
 *
 * @see Email
 */
@Repository
public interface EmailRepository extends CrudRepository<Email, BigInteger> {}
