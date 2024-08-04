package com.spendingstracker.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;

import lombok.Data;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigInteger;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity {
    @CreatedBy
    @Column(name = "CREATED_BY", updatable = false)
    private BigInteger createdBy;

    @CreatedDate
    @Column(name = "CREATED_ON", updatable = false)
    private LocalDateTime createdOn;

    @LastModifiedBy
    @Column(name = "LAST_MODIFIED_BY")
    private BigInteger lastModifiedBy;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_ON")
    private LocalDateTime lastModifiedOn;

    @Version
    @Column(name = "OPTIMISTIC_LOCK")
    private Long optimisticLock = 0L;
}
