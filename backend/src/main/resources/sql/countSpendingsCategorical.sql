SELECT
    COUNT(*)
FROM (
    SELECT
        COUNT(*)
    FROM
        APP.SPENDING_USER_AGGR SUA,
        APP.SPENDING S,
        APP.SPENDING_CATEGORY SC
    WHERE
            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
        AND S.SPENDING_CATEGORY_ID = SC.SPENDING_CATEGORY_ID
        AND SUA.USER_ID = :userId
        AND SUA.DATE >= :startDate
        AND SUA.DATE <= :endDate
    GROUP BY
        SC.NAME
    ORDER BY
        SUM(S.AMOUNT) DESC
) AS A
;