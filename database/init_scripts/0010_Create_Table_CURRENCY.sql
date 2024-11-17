CREATE TABLE
    IF NOT EXISTS APP.CURRENCY (
        CURRENCY_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary Key for CURRENCY in this table",
        LONG_NAME VARCHAR(64) NOT NULL COMMENT "Full form name of the currency",
        SHORT_NAME VARCHAR(3) NOT NULL COMMENT "3 letter code of the currency",
        SYMBOL CHAR(1) NOT NULL COMMENT "Currency symbol",
        FLAG_IMG_URL VARCHAR(64) NOT NULL COMMENT "URL to an image of the origin country's flag. Provided by FlagCDN",
        IS_ACTIVE CHAR(1) NOT NULL DEFAULT "Y" COMMENT "Indicates if currency is active. N is No, Y is Yes",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (CURRENCY_ID),
        INDEX IDX_LONG_NAME (LONG_NAME),
        INDEX IDX_SHORT_NAME (SHORT_NAME),
        INDEX IDX_IS_ACTIVE (IS_ACTIVE)
    ) ENGINE = InnoDB;