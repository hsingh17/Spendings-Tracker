package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.UserDao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserDao, Integer> {
    UserDao findByName(String name);
}
