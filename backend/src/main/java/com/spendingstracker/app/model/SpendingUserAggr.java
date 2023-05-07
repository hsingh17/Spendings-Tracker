package com.spendingstracker.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(schema = "APP", name = "SPENDING_USER_AGGR")
public class SpendingUserAggr {
    @Id
    @Column(name = "SPENDING_USER_AGGR_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long spendingUserAggrId;

    @JoinColumn(name = "USER_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    @Column(name = "DATE")
    private Date date;

    @OneToMany(mappedBy = "spendingUserAggr", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Spending> spendings = new HashSet<>();

    public SpendingUserAggr() {}

    public SpendingUserAggr(User user, Date date, Set<Spending> spendings) {
        this.user = user;
        this.date = date;
        this.spendings = spendings;
        spendings.forEach(spending -> spending.setSpendingUserAggr(this));
    }

    public long getSpendingUserAggrId() {
        return spendingUserAggrId;
    }

    public void setSpendingUserAggrId(long spendingUserAggrId) {
        this.spendingUserAggrId = spendingUserAggrId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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
