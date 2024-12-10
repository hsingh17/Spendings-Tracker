# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- possible cutover to cognito(?)

  - create cognito user pool -> DONE
  - sign up/create user:
    - SignUp (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#CognitoUserPools-SignUp-request-ClientId)-> for user sign page, sends code to user's email
    - ResendConfirmationCode (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ResendConfirmationCode.html) -> resend code
    - ConfirmSignUp (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ConfirmSignUp.html) -> verify sign up using emailed code. then follow remaining steps under login
  - login:

    - AdminInitiateAuth (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminInitiateAuth.html) -> initiate login
    - if AdminInitiateAuth -> returns ChallengeName = MFA_SETUP:
      - AssociateSoftwareToken (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AssociateSoftwareToken.html) -> show QR code using react qr code library of SecretCode
      - VerifySoftwareToken (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_VerifySoftwareToken.html) -> verify mfa setup -> pass Session to AdminRespondToAuthChallenge with Challenge = MFA_SETUP to complete sign in
    - AdminRespondToAuthChallenge (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminRespondToAuthChallenge.html) -> respond to MFA challenge and returns JWTs

  - need to migrate tables from using USER_ID to USER_SUB in cognito
  - maybe make a cache for storing 250 cognito users
  - can drop unnecessary tables and scripts (USER, USER_PASSWORD_RESET, etc.)
  - may need a new test user script
  - need to enhance JWT Filter/JWT token svc for validating cognito id tokens (https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html)
  - setup google idp

- dashboard -> graphs
- zoom in/out in line charts
- home page -> cool parallax effect
- dark/light mode
- make custom logo
- regenerate javadocs
- update ERD -> export from dbeaver
- add junit tests for controller, service, repo
  - user and spendings
- test from scratch
- add sitemap stuff https://stackoverflow.com/a/62976735
- create aws architecture and deploy

## Known issues
