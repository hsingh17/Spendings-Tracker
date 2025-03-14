SELECT
    COUNT(*)
FROM (
    SELECT
        (
            CASE
                WHEN :granularity = "DAY" THEN (
                    DATE_FORMAT (SUA.DATE, "%Y-%m-%d")
                )
                WHEN :granularity = "WEEK" THEN (
                    DATE_FORMAT (
                        DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                        "%Y-%m-%d"
                    )
                )
                WHEN :granularity = "MONTH" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-%m-01")
                )
                WHEN :granularity = "YEAR" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-01-01")
                )
                ELSE SUA.DATE
            END
        ) AS date,
        GROUP_CONCAT(SC.NAME ORDER BY S.SPENDING_ID) AS categories,
        GROUP_CONCAT(S.AMOUNT ORDER BY S.SPENDING_ID) AS amounts
    FROM
        APP.SPENDING_USER_AGGR SUA,
        APP.SPENDING S,
        APP.SPENDING_CATEGORY SC
    WHERE
            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
        AND SC.SPENDING_CATEGORY_ID = S.SPENDING_CATEGORY_ID
        AND SUA.USER_ID = :userId
        AND SUA.DATE >= :startDate
        AND SUA.DATE <= :endDate
    GROUP BY
        (
            CASE
                WHEN :granularity = "DAY" THEN (
                    DATE_FORMAT (SUA.DATE, "%Y-%m-%d")
                )
                WHEN :granularity = "WEEK" THEN (
                    DATE_FORMAT (
                        DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                        "%Y-%m-%d"
                    )
                )
                WHEN :granularity = "MONTH" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-%m-01")
                )
                WHEN :granularity = "YEAR" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-01-01")
                )
                ELSE SUA.DATE
            END
        )
    ORDER BY
        (
            CASE
                WHEN :granularity = "DAY" THEN (
                    DATE_FORMAT (SUA.DATE, "%Y-%m-%d")
                )
                WHEN :granularity = "WEEK" THEN (
                    DATE_FORMAT (
                        DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                        "%Y-%m-%d"
                    )
                )
                WHEN :granularity = "MONTH" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-%m-01")
                )
                WHEN :granularity = "YEAR" THEN (
                    DATE_FORMAT(SUA.DATE, "%Y-01-01")
                )
                ELSE SUA.DATE
            END
        ) DESC
) AS A;