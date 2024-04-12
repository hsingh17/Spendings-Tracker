CREATE TABLE
    IF NOT EXISTS APP.USER_REGISTRATION (
        USER_REGISTRATION_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this USER_REGISTRATION record",
        USER_ID BIGINT UNSIGNED NOT NULL COMMENT "Foreign key to the USER that is associated with this USER_REGISTRATION record",
        PIN VARCHAR(5) NOT NULL COMMENT "Randomly generated PIN for the user to register their account with",
        MESSAGE_ID VARCHAR(256) NOT NULL COMMENT "Message ID returned by Mail API for this sent email",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_REGISTRATION_ID),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID),
        INDEX IDX_USER_ID_PIN (USER_ID, PIN)
    ) ENGINE = InnoDB;