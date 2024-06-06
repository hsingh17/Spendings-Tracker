DELIMITER $$

CREATE PROCEDURE APP.APP_ADD_SPENDINGS ( userId BIGINT )
BEGIN
    DECLARE I INT;
    DECLARE J INT;

    SET I = 0;
    
    INSERT_SPENDING_DATE_LOOP: LOOP
        IF I = 100 THEN
            LEAVE INSERT_SPENDING_DATE_LOOP;
        END IF;

        INSERT INTO
            APP.SPENDING_USER_AGGR (USER_ID, DATE)
        VALUES
            (
                userId,
                DATE_SUB (CURDATE (), INTERVAL FLOOR(RAND () * 10000) DAY)
            );

        SET J = 0;
        INSERT_SPENDING_LOOP: LOOP
            IF J = 100 THEN
                LEAVE INSERT_SPENDING_LOOP;
            END IF;

            INSERT INTO
                APP.SPENDING (SPENDING_USER_AGGR_ID, CATEGORY, AMOUNT)
            SELECT
                MAX(SUA.SPENDING_USER_AGGR_ID),
                (
                    SELECT
                        CATEGORY
                    FROM
                        APP.SPENDING_CATEGORY
                    ORDER BY
                        RAND ()
                    LIMIT
                        1
                ),
                RAND () * 100000
FROM
    APP.SPENDING_USER_AGGR SUA;

            SET J = J + 1;
            ITERATE INSERT_SPENDING_LOOP;
        END LOOP INSERT_SPENDING_LOOP;

        SET I = I + 1;
        ITERATE INSERT_SPENDING_DATE_LOOP;
    END LOOP INSERT_SPENDING_DATE_LOOP;
END $$

DELIMITER ;

CALL APP.APP_ADD_SPENDINGS (1001);
CALL APP.APP_ADD_SPENDINGS (1002);
CALL APP.APP_ADD_SPENDINGS (1003);
CALL APP.APP_ADD_SPENDINGS (1004);
CALL APP.APP_ADD_SPENDINGS (1005);

DROP PROCEDURE IF EXISTS APP.APP_ADD_SPENDINGS;