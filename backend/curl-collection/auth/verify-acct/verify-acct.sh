#!/usr/bin/bash
curl -c ~/.curl/cookie.txt -d "@$2" -X PUT -H "Content-Type: application/json" "http://localhost:8080/v1/auth/verify-acct/$1" | jq
