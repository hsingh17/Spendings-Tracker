CREATE TABLE
    IF NOT EXISTS APP.USER_MFA_STRING (
        USER_MFA_STRING_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this USER_MFA_STRING record",
        USER_ID BIGINT UNSIGNED NOT NULL COMMENT "Foreign key to the USER that is associated with this USER_MFA_STRING record",
        SECRET_STRING VARCHAR(64) NOT NULL COMMENT "Secret string used to generate the QR code for MFA. This is encrypted.",
        IS_ACTIVE CHAR(1) NOT NULL COMMENT "If the secret string is active",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_MFA_STRING_ID),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;