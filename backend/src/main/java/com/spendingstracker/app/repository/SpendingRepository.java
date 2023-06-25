package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpendingRepository extends JpaRepository<Spending, Long> {

}
