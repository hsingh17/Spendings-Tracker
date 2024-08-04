package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/** An entity class that maps to the table <code>APP.SPENDING_USER_AGGR</code> */
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(schema = "APP", name = "SPENDING_USER_AGGR")
public class SpendingUserAggr extends AuditableEntity {
    @Id
    @Column(name = "SPENDING_USER_AGGR_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger spendingUserAggrId;

    @JoinColumn(name = "USER_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    @Column(name = "DATE")
    private LocalDate date;

    @OneToMany(
            mappedBy = "spendingUserAggr",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    private List<Spending> spendings = new ArrayList<>();

    public SpendingUserAggr(User user, LocalDate date, List<Spending> spendings) {
        this.user = user;
        this.date = date;
        this.spendings = spendings;
        spendings.forEach(spending -> spending.setSpendingUserAggr(this));
    }

    public void addSpending(Spending spending) {
        spending.setSpendingUserAggr(this);
        spendings.add(spending);
    }

    public void removeSpending(Spending spending) {
        spendings.remove(spending);
    }
}
