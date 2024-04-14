CREATE TABLE
    IF NOT EXISTS APP.USER_PASSWORD_RESET (
        USER_PASSWORD_RESET BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this USER_PASSWORD_RESET record",
        USER_ID BIGINT UNSIGNED NOT NULL COMMENT "Foreign key to the USER that is associated with this USER_PASSWORD_RESET record",
        UUID VARCHAR(256) NOT NULL COMMENT "UUID for this password reset request so that only user who receives the email can reset password.",
        IS_USED CHAR(1) NOT NULL COMMENT "If the password reset request has been used or not",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_PASSWORD_RESET),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID),
        INDEX IDX_USER_ID_UUID (USER_ID, UUID),
        INDEX IDX_USER_ID_UUID_IS_USED (USER_ID, UUID, IS_USED)
    ) ENGINE = InnoDB;