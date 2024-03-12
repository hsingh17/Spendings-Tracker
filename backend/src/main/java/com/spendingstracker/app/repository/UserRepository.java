package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/** <code>JpaRepository</code> used to make queries to the <code>APP>.USER</code> table. */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
