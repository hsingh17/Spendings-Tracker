package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP.USER</code> table.
 *
 * @see User
 */
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

    /**
     * Find <code>User</code> by <code>username</code> and if the user should be verified
     *
     * @param username self-explanatory
     * @param isVerified if the user should be verified or not
     * @return <code>User</code> object for the <code>username</code>.
     * @see User
     */
    @Query(
            value =
                    """
                SELECT
                    U.*
                FROM
                    APP.USER U
                WHERE
                        U.USERNAME = :username
                    AND U.IS_VERIFIED = :isVerified
            """,
            nativeQuery = true)
    Optional<User> findByUsernameAndVerificationStatus(
            @Param("username") String username, @Param("isVerified") boolean isVerified);
}
