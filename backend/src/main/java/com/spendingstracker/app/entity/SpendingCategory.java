package com.spendingstracker.app.entity;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/** An entity class that maps to the table <code>APP.SPENDING_CATEGORY</code> */
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(schema = "APP", name = "SPENDING_CATEGORY")
public class SpendingCategory extends AuditableEntity
        implements CacheableEntity<SpendingCategoryEnum> {
    @Id
    @Column(name = "SPENDING_CATEGORY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger spendingCategoryId;

    @Column(name = "NAME")
    private SpendingCategoryEnum name;

    @Column(name = "S3_KEY")
    private String s3Key;

    @Column(name = "IS_ACTIVE")
    private boolean isActive = true;

    public SpendingCategory(SpendingCategoryEnum name) {
        this.name = name;
    }

    @Override
    public SpendingCategoryEnum getCacheKey() {
        return name;
    }
}
