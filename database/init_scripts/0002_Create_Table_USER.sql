CREATE TABLE
    IF NOT EXISTS APP.USER (
        USER_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary Key for user in this table",
        USERNAME VARCHAR(100) NOT NULL COMMENT "User's name",
        PASSWORD VARCHAR(255) NOT NULL COMMENT "User's password",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (USER_ID),
        INDEX IDX_USERNAME (USERNAME),
        INDEX IDX_USERNAME_PASSWORD (USERNAME, PASSWORD)
    ) ENGINE = InnoDB;