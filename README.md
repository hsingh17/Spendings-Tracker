# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- mfa
  - https://github.com/samdjstevens/java-totp
  - need new column on USER -> HAS_MFA
    - will likely need some sort of frontend check on HAS_MFA and if no MFA setup, show MFA setup screens
  - new table to store recovery codes -> USER_RECOVERY_CODES -> encrypt recovery codes
  - new table to store mfa user secret string -> USER_MFA_STRING -> encrypt secret string
- dashboard -> graphs
- zoom in/out in line charts
- home page -> cool parallax effect
- dark/light mode
- make custom logo
- Use CF dist. for spending category images (maybe, need to consider how to keep images private)
- update ERD -> export from dbeaver
- add junit tests for controller, service, repo
  - user and spendings
- regenerate javadocs
- test from scratch
- add sitemap stuff https://stackoverflow.com/a/62976735
- create aws architecture and deploy

## Known issues
