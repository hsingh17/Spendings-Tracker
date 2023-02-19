CREATE TABLE IF NOT EXISTS APP.USERS (
    USER_ID         BIGINT              NOT NULL            AUTO_INCREMENT,     
    USERNAME        VARCHAR(100)        NOT NULL                          ,
    PASSWORD        VARCHAR(255)        NOT NULL                          ,

    PRIMARY KEY ( USER_ID ),
    INDEX IDX_USERNAME ( USERNAME )
)
    ENGINE=InnoDB
;