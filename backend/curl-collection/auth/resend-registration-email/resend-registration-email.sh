#!/usr/bin/bash
curl -X POST -H "Content-Type: application/json" "http://localhost:8080/v1/auth/resend-registration-email/$1" | jq
