#!/usr/bin/bash
curl -X POST -H "Content-Type: application/json" "http://localhost:8080/v1/auth/send-password-reset-email/$1" | jq