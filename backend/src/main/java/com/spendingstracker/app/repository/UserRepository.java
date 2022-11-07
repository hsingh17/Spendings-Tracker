package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {
    UserModel findByName(String name);
}
