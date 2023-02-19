CREATE TABLE IF NOT EXISTS APP.SPENDINGS (
    SPENDING_ID             BIGINT              NOT NULL            AUTO_INCREMENT,     
    USER_ID                 BIGINT              NOT NULL                          ,
    SPENDING_CATEGORY       VARCHAR(100)        NOT NULL                          ,
    SPENDING_AMOUNT         DECIMAL(10,2)       NOT NULL                          ,
    SPENDING_DATE           DATE                NOT NULL                          ,

    PRIMARY KEY ( SPENDING_ID ),
    FOREIGN KEY ( USER_ID )
        REFERENCES APP.USERS( USER_ID ),
   INDEX IDX_USER_ID_SPENDING_DATE ( USER_ID, SPENDING_DATE )
)
    ENGINE=InnoDB
;