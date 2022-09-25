package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.Spending;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpendingRepository extends CrudRepository<Spending, Integer> {
}
