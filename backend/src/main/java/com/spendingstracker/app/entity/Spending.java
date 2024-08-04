package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;

/** An entity class that maps to the table <code>APP.SPENDING</code> */
@Entity
@Table(schema = "APP", name = "SPENDING")
@Getter
@Setter
@NoArgsConstructor
public class Spending extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SPENDING_ID")
    private BigInteger spendingId;

    @JoinColumn(name = "SPENDING_USER_AGGR_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private SpendingUserAggr spendingUserAggr;

    @JoinColumn(name = "SPENDING_CATEGORY_ID")
    @OneToOne(fetch = FetchType.LAZY)
    private SpendingCategory spendingCategory;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    public Spending(SpendingCategory spendingCategory, BigDecimal amount) {
        this.spendingCategory = spendingCategory;
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Spending)) {
            return false;
        }

        return this.spendingId.equals(((Spending) o).spendingId);
    }
}
