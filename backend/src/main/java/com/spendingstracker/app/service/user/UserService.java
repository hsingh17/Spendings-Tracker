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
}
