package com.spendingstracker.app.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SpendingUserAggrRepositoryTest {
    @Autowired SpendingUserAggrRepository spendingUserAggrRepository;

    @Test
    public void shouldSaveFindDelete() {
        // Setup
        LocalDate date = LocalDate.now();
        SpendingCategoryEnum[] categoriesEnum = SpendingCategoryEnum.values();
        List<SpendingCategory> categories = new ArrayList<>();
        for (SpendingCategoryEnum spendingCategoryEnum : categoriesEnum) {
            categories.add(new SpendingCategory(spendingCategoryEnum));
        }

        List<Spending> spendings = new ArrayList<>();
        for (int i = 0; i < categories.size(); i++) {
            SpendingCategory category = categories.get(i);
            spendings.add(
                    new Spending(category, BigDecimal.TEN.multiply(BigDecimal.valueOf(i)), ""));
        }

        User user = new User("foo", "foo@bar.com", "bar");
        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, date, spendings);
        // Save
        spendingUserAggr = spendingUserAggrRepository.save(spendingUserAggr);
        BigInteger id = spendingUserAggr.getSpendingUserAggrId();
        assertNotNull(id);

        // Find
        Optional<SpendingUserAggr> spendingUserAggrOpt =
                spendingUserAggrRepository.findSpendingUserAggrByUserAndDate(user, date);

        assertFalse(spendingUserAggrOpt.isEmpty());
        assertEquals(
                spendingUserAggr.getSpendingUserAggrId(),
                spendingUserAggrOpt.get().getSpendingUserAggrId());

        // Delete
        assertDoesNotThrow(() -> spendingUserAggrRepository.deleteById(id));
    }
}
