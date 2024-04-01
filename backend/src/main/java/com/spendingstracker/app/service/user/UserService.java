package com.spendingstracker.app.service.user;

import com.spendingstracker.app.entity.User;

import java.math.BigInteger;

/**
 * Interface to define a service that performs operations on the <code>USER</code> table
 *
 * @see UserServiceImpl
 */
public interface UserService {
    User getUserById(BigInteger userId);

    /**
     * Create and save a <code>User</code> object to store into the database
     *
     * @param username
     * @param email
     * @param password
     * @return <code>BigInteger</code> of user's <code>USER_ID</code> after saving into the
     * database.
     * @see User
     */
    User createUser(String username, String email, String password);
}
