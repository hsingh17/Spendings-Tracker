package com.spendingstracker.app.repository;

import com.spendingstracker.app.model.Spending;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SpendingRepository extends CrudRepository<Spending, Integer> {
    List<Spending> findByUserIdOrderByDateAsc(Integer userId);
    List<Spending> findByUserIdAndDateGreaterThanEqualOrderByDateAsc(Integer userId, Date startDate);
    List<Spending> findByUserIdAndDateLessThanEqualOrderByDateAsc(Integer userId, Date endDate);
    List<Spending> findByUserIdAndDateBetweenOrderByDateAsc(Integer userId, Date startDate, Date endDate);
}
