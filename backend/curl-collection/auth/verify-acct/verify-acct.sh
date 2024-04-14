curl -c ~/.curl/cookie.txt -d "@verify-acct.json" -X PUT -H "Content-Type: application/json" http://localhost:8080/v1/auth/verify-acct/TEST12 | jq
