package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

/** <code>JpaRepository</code> used to make queries to the <code>APP>.USER</code> table. */
@Repository
public interface UserRepository extends CrudRepository<User, BigInteger> {
    /**
     * Find <code>User</code> by <code>username</code>
     *
     * @param username self-explanatory
     * @return <code>User</code> object for the <code>username</code>.
     * @see User
     */
    Optional<User> findByUsername(String username);
}
