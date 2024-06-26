package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
    private Set<Spending> spendings = new HashSet<>();


    public SpendingUserAggr(User user, LocalDate date, Set<Spending> spendings) {
        this.user = user;
        this.date = date;
        this.spendings = spendings;
        spendings.forEach(spending -> spending.setSpendingUserAggr(this));
    }

    public BigInteger getSpendingUserAggrId() {
        return spendingUserAggrId;
    }

    public void setSpendingUserAggrId(BigInteger spendingUserAggrId) {
        this.spendingUserAggrId = spendingUserAggrId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Spending> getSpendings() {
        return spendings;
    }

    public void setSpendings(Set<Spending> spendings) {
        spendings.forEach(spending -> spending.setSpendingUserAggr(this));
        this.spendings = spendings;
    }

    public void addSpending(Spending spending) {
        spending.setSpendingUserAggr(this);
        spendings.add(spending);
    }

    public void removeSpending(Spending spending) {
        spendings.remove(spending);
    }

    public void addSpendings(Set<Spending> spendings) {
        spendings.forEach(spending -> spending.setSpendingUserAggr(this));
        this.spendings.addAll(spendings);
    }

    public void removeSpendings(Set<Spending> spendings) {
        this.spendings.removeAll(spendings);
    }

    public void emptySpendings() {
        spendings.clear();
    }
}
