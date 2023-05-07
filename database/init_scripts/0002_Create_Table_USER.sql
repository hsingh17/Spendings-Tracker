CREATE TABLE IF NOT EXISTS APP.USER (
    USER_ID         BIGINT              NOT NULL            AUTO_INCREMENT,     
    USERNAME        VARCHAR(100)        NOT NULL                          ,
    PASSWORD        VARCHAR(255)        NOT NULL                          ,

    PRIMARY KEY ( USER_ID ),
    INDEX IDX_USERNAME ( USERNAME ),
    INDEX IDX_USERNAME_PASSWORD ( USERNAME, PASSWORD )
)
    ENGINE=InnoDB
;
