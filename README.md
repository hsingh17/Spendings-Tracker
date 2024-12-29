# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- possible cutover to cognito(?)

  - create cognito user pool -> DONE
  - sign up/create user:
    - SignUp (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#CognitoUserPools-SignUp-request-ClientId)-> for user sign page, sends code to user's email -> DONE
    - ResendConfirmationCode (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ResendConfirmationCode.html) -> resend code -> DONE
    - ConfirmSignUp (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ConfirmSignUp.html) -> verify sign up using emailed code. then follow remaining steps under login -> DONE
  - login:

    - AdminInitiateAuth (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminInitiateAuth.html) -> initiate login -> DONE
    - if AdminInitiateAuth -> returns ChallengeName = MFA_SETUP:
      - AssociateSoftwareToken (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AssociateSoftwareToken.html) -> show QR code using react qr code library of SecretCode -> DONE
        - https://github.com/google/google-authenticator/wiki/Key-Uri-Format
        - https://www.npmjs.com/package/otpauth
      - VerifySoftwareToken (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_VerifySoftwareToken.html) -> verify mfa setup -> pass Session to AdminRespondToAuthChallenge with Challenge = MFA_SETUP/SOFTWARE_TOKEN_MFA (depending on if new or existing user) to complete sign in -> DONE
    - AdminRespondToAuthChallenge (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminRespondToAuthChallenge.html) -> respond to MFA challenge and returns JWTs -> DONE

  - Sign out:

    - AdminUserGlobalSignOut (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminUserGlobalSignOut.html) -> DONE

  - setup google idp
  - need to migrate tables from using USER_ID to USER_SUB in cognito
  - maybe make a cache for storing 250 cognito users
  - can drop unnecessary tables and scripts (USER, USER_PASSWORD_RESET, etc.)
  - may need a new test user script
  - need to enhance JWT Filter/JWT token svc for validating cognito ID TOKENS (NOT ACCESS) (https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html)
  - Setup up frontend code for on 4xx failures, use refresh token to get new access and id tokens (means need to store refresh token as an HTTP only cookie)

- Use CF dist. for spending category images (maybe, need to consider how to keep images private)
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
