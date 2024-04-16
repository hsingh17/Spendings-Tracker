#!/usr/bin/bash
curl -X PATCH -d "@$2" -H "Content-Type: application/json" "http://localhost:8080/v1/auth/reset-password/$1" | jq