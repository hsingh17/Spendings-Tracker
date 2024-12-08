CREATE TABLE
    IF NOT EXISTS APP.USER (
        USER_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary Key for user in this table",
        EMAIL VARCHAR(255) NOT NULL COMMENT "User's email",
        USERNAME VARCHAR(128) NOT NULL COMMENT "User's name",
        PASSWORD VARCHAR(64) NULL DEFAULT NULL COMMENT "User's password. Nullable since external users don't have a password",
        PREF_CURRENCY_ID BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "User's preferred currency as a foreign key to the CURRENCY table. Defaults to 1 (USD)",
        IS_ACTIVE CHAR(1) NOT NULL DEFAULT "Y" COMMENT "Indicates if user is active. N is No, Y is Yes",
        IS_VERIFIED CHAR(1) NOT NULL DEFAULT "N" COMMENT "Indicates if user has verified their account. N is No, Y is Yes",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_ID),
        FOREIGN KEY (PREF_CURRENCY_ID) REFERENCES APP.CURRENCY (CURRENCY_ID),
        INDEX IDX_USERNAME (USERNAME),
        INDEX IDX_USERNAME_PASSWORD (USERNAME, PASSWORD)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8mb4_bin;

-- Start USER table at PK 1000 to reserve 1000 IDs for automated processes.
ALTER TABLE APP.USER AUTO_INCREMENT = 1000;