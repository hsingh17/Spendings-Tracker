CREATE TABLE
    IF NOT EXISTS APP.EXTERNAL_USER (
        EXTERNAL_USER_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this EXTERNAL_USER record",
        USER_ID BIGINT UNSIGNED NOT NULL COMMENT "Foreign key to the USER that is associated with this EXTERNAL_USER record",
        EXTERNAL_USER_TYPE VARCHAR(5) NOT NULL COMMENT "Type of external user",
        EXTERNAL_IDENTIF VARCHAR(255) NOT NULL COMMENT "Identifier of the user from the external provider",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (EXTERNAL_USER_ID),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID),
        INDEX IDX_SUB (EXTERNAL_IDENTIF)
    ) ENGINE = InnoDB;