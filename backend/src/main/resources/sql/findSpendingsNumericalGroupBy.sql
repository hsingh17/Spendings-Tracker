SELECT
    MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
    SUM(S.AMOUNT) AS total,
    (
        CASE
            WHEN :granulatity = "DAY" THEN (
                DATE_FORMAT (SUA.DATE, "%Y-%m-%d") AS date
            )
            WHEN :granulatity = "WEEK" THEN (
                DATE_FORMAT (
                    DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                    "%Y-%m-%d"
                )
            )
            WHEN :granulatity = "MONTH" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-%m-01") AS date,
            )
            WHEN :granulatity = "YEAR" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-01-01")
            )
            ELSE SUA.DATE
        END
    ) AS date
FROM
APP.SPENDING_USER_AGGR SUA,
    APP.SPENDING S
WHERE
        SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
    AND SUA.USER_ID = :userId
    AND SUA.DATE >= :startDate
    AND SUA.DATE <= :endDate
GROUP BY
    (
        CASE
            WHEN :granulatity = "DAY" THEN (
                DATE_FORMAT (SUA.DATE, "%Y-%m-%d") AS date
            )
            WHEN :granulatity = "WEEK" THEN (
                DATE_FORMAT (
                    DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                    "%Y-%m-%d"
                )
            )
            WHEN :granulatity = "MONTH" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-%m-01") AS date,
            )
            WHEN :granulatity = "YEAR" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-01-01")
            )
            ELSE SUA.DATE
        END
    )
ORDER BY
    (
        CASE
            WHEN :granulatity = "DAY" THEN (
                DATE_FORMAT (SUA.DATE, "%Y-%m-%d") AS date
            )
            WHEN :granulatity = "WEEK" THEN (
                DATE_FORMAT (
                    DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                    "%Y-%m-%d"
                )
            )
            WHEN :granulatity = "MONTH" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-%m-01") AS date,
            )
            WHEN :granulatity = "YEAR" THEN (
                DATE_FORMAT(SUA.DATE, "%Y-01-01")
            )
            ELSE SUA.DATE
        END
    )
;