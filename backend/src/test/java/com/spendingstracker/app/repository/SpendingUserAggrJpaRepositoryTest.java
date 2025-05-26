package com.spendingstracker.app.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles(profiles = "local")
public class SpendingUserAggrJpaRepositoryTest {
    @Autowired SpendingCategoryRepositoryApp spendingCategoryRepository;
    @Autowired CurrencyRepository currencyRepository;
    @Autowired UserRepository userRepository;
    @Autowired SpendingUserAggrJpaRepository spendingUserAggrJpaRepository;

    @Test
    public void shouldSaveFindDelete() {
        // Setup
        LocalDate date = LocalDate.now();
        List<SpendingCategory> categories =
                spendingCategoryRepository.getActiveSpendingCategories();
        List<Spending> spendings = new ArrayList<>();

        for (int i = 0; i < categories.size(); i++) {
            SpendingCategory category = categories.get(i);
            Spending spending =
                    new Spending(category, BigDecimal.TEN.multiply(BigDecimal.valueOf(i)), "");
            spending.setSpendingCategory(category);
            spending.setCreatedBy(BigInteger.ONE);
            spending.setLastModifiedBy(BigInteger.ONE);
            spending.setCreatedOn(Instant.now());
            spending.setLastModifiedOn(Instant.now());
            spendings.add(spending);
        }

        User user = new User("foo", "foo@bar.com", "bar");
        user.setCreatedBy(BigInteger.ONE);
        user.setLastModifiedBy(BigInteger.ONE);
        user.setCreatedOn(Instant.now());
        user.setLastModifiedOn(Instant.now());
        user.setPrefCurrency(currencyRepository.getActiveCurrencies().get(0));

        user = userRepository.save(user);

        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, date, spendings);
        spendingUserAggr.setCreatedBy(BigInteger.ONE);
        spendingUserAggr.setLastModifiedBy(BigInteger.ONE);
        spendingUserAggr.setCreatedOn(Instant.now());
        spendingUserAggr.setLastModifiedOn(Instant.now());

        // Save
        spendingUserAggr = spendingUserAggrJpaRepository.save(spendingUserAggr);
        BigInteger id = spendingUserAggr.getSpendingUserAggrId();
        assertNotNull(id);

        // Find
        Optional<SpendingUserAggr> spendingUserAggrOpt =
                spendingUserAggrJpaRepository.findSpendingUserAggrByUserAndDate(user, date);

        assertFalse(spendingUserAggrOpt.isEmpty());
        assertEquals(
                spendingUserAggr.getSpendingUserAggrId(),
                spendingUserAggrOpt.get().getSpendingUserAggrId());

        // Delete
        assertDoesNotThrow(() -> spendingUserAggrJpaRepository.deleteById(id));
    }
}
