CREATE TABLE IF NOT EXISTS APP.SPENDING (
    SPENDING_ID                         BIGINT                      NOT NULL            AUTO_INCREMENT,     
    SPENDING_USER_AGGR_ID               BIGINT                      NOT NULL                          ,
    CATEGORY                            VARCHAR(100)                NOT NULL                          ,
    AMOUNT                              DECIMAL(10,2)               NOT NULL                          ,

    PRIMARY KEY ( SPENDING_ID ),
    FOREIGN KEY ( SPENDING_USER_AGGR_ID )
        REFERENCES APP.SPENDING_USER_AGGR ( SPENDING_USER_AGGR_ID )
)
    ENGINE=InnoDB
;