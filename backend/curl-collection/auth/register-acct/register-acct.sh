#!/usr/bin/bash
curl -X POST -d "@$1" -H "Content-Type: application/json" http://localhost:8080/v1/auth/register | jq	
