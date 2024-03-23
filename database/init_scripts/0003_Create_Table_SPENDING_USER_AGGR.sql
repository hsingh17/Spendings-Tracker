CREATE TABLE
    IF NOT EXISTS APP.SPENDING_USER_AGGR (
        SPENDING_USER_AGGR_ID UNSIGNED BIGINT NOT NULL "Primary key of this table",
        USER_ID UNSIGNED BIGINT NOT NULL COMMENT "Foreign key to the USER table of which user this spending is associated with",
        DATE DATE NOT NULL COMMENT "Date of the spending",
        CREATED_BY UNSIGNED BIGINT DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY UNSIGNED BIGINT DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK UNSIGNED BIGINT DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (SPENDING_USER_AGGR_ID),
        FOREIGN KEY (USER_ID) REFERENCES APP.USER (USER_ID),
        INDEX IDX_DATE (DATE)
    ) ENGINE = InnoDB;