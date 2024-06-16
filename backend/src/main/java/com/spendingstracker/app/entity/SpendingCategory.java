package com.spendingstracker.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/** An entity class that maps to the table <code>APP.SPENDING_CATEGORY</code> */
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(schema = "APP", name = "SPENDING_CATEGORY")
public class SpendingCategory extends AuditableEntity {
    @Id
    @Column(name = "SPENDING_CATEGORY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger spendingCategoryId;

    @Column(name = "NAME")
    private SpendingCategoryEnum name;

    @Column(name = "S3_SVG_URL")
    private String s3SvgUrl;

    @Column(name = "IS_ACTIVE")
    private boolean isActive;
}
