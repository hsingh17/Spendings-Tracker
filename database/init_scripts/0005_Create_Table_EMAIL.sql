CREATE TABLE
    IF NOT EXISTS APP.EMAIL (
        EMAIL_ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "Primary key of this EMAIL record",
        FROM_EMAIL VARCHAR(255) NOT NULL COMMENT "Who the email was sent from",
        TO_EMAIL VARCHAR(255) NOT NULL COMMENT "Who the email was sent to",
        TEMPLATE_NAME VARCHAR(127) NOT NULL COMMENT "Name of the template that was sent",
        TEMPLATE_DATA BLOB NOT NULL COMMENT "Data necessary to populate the template",
        SES_MESSAGE_ID VARCHAR(255) NOT NULL COMMENT "Message ID returned by SES API for this sent email",
        CREATED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what created this record",
        CREATED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of creation",
        LAST_MODIFIED_BY BIGINT UNSIGNED NOT NULL DEFAULT 1 COMMENT "ID of who/what updated this record",
        LAST_MODIFIED_ON DATETIME (0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "Datetime of last time the record was updated",
        OPTIMISTIC_LOCK BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT "Optimistic lock for the record",
        PRIMARY KEY (EMAIL_ID),
        INDEX IDX_TO_EMAIL (TO_EMAIL),
        INDEX IDX_SES_MESSAGE_ID (SES_MESSAGE_ID),
        INDEX IDX_TO_EMAIL_TEMPLATE_NAME (TO_EMAIL, TEMPLATE_NAME)
    ) ENGINE = InnoDB;