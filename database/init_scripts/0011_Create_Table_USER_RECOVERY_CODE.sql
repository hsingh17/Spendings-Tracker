CREATE TABLE
    IF NOT EXISTS APP.USER_RECOVERY_CODE (
        USER_RECOVERY_CODE_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this USER_RECOVERY_CODE record",
        USER_ID BIGINT UNSIGNED NOT NULL COMMENT "Foreign key to the USER that is associated with this USER_RECOVERY_CODE record",
        RECOVERY_CODE VARCHAR(64) NOT NULL COMMENT "One of the user's MFA recovery code. This is encrypted.",
        IS_ACTIVE CHAR(1) NOT NULL COMMENT "If the recovery code is active",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_RECOVERY_CODE_ID),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;