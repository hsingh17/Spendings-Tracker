CREATE TABLE IF NOT EXISTS APP.SPENDING_USER_AGGR (
    SPENDING_USER_AGGR_ID           BIGINT          NOT NULL             AUTO_INCREMENT,
    USER_ID                         BIGINT          NOT NULL                           ,
    DATE                            DATE            NOT NULL                           ,

    PRIMARY KEY ( SPENDING_USER_AGGR_ID ),
    FOREIGN KEY ( USER_ID )
        REFERENCES APP.USER ( USER_ID ),
    INDEX IDX_DATE ( DATE )

)
    ENGINE=InnoDB
;
