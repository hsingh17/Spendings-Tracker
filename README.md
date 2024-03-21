# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- clean up backend api more
  - add audit fields to db model (created on, created by, last modified on, last modified by)
  - update frontend after above changes 
  - add ability to create an account w/ code that sends to person's email
  - register account api
  - google oauth2 login -> maybe need separate table to store oauth tokens (idk why u would need to but maybe?) -> will need to check to see if user is already created in APP.USER
- remove group by for bar and pie charts
  - add junit tests for repo layer at minimum
- dashboard -> graphs
- home page -> cool parallax effect
- reset password
- add empty state and erorr states everywhere
- add fontawesome icons to relevant areas (signin button, username/password icons)
- clean up add/edit spending UI
- test from scratch

## Known issues

- on SaveSpendingsForm highlighting the entire amount and pressing any key results in "NaN"
