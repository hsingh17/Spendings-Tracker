package com.spendingstracker.app.entity;

import com.spendingstracker.app.constants.CurrencyEnum;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.Objects;

/** An entity class that maps to the table <code>APP.CURRENCY</code> */
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(schema = "APP", name = "CURRENCY")
public class Currency extends AuditableEntity implements CacheableEntity<CurrencyEnum> {
    @Id
    @Column(name = "CURRENCY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger currencyId;

    @Column(name = "LONG_NAME")
    private String longName;

    @Column(name = "SHORT_NAME")
    private CurrencyEnum shortName;

    @Column(name = "SYMBOL")
    private String symbol;

    @Column(name = "FLAG_IMG_URL")
    private String flagImgUrl;

    @Column(name = "IS_ACTIVE")
    private boolean isActive = true;

    @Override
    public CurrencyEnum getCacheKey() {
        return shortName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Currency currency) || !super.equals(o)) {
            return false;
        }

        return isActive == currency.isActive
                && Objects.equals(currencyId, currency.currencyId)
                && Objects.equals(longName, currency.longName)
                && shortName == currency.shortName
                && Objects.equals(symbol, currency.symbol)
                && Objects.equals(flagImgUrl, currency.flagImgUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                super.hashCode(), currencyId, longName, shortName, symbol, flagImgUrl, isActive);
    }
}
