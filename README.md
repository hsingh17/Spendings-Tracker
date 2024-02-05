# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js

## TODO
- metrics page
- add eslint and prettier -> clean up accordingly
- clean up backend api more
    - date -> localdate
    - add audit fields to db model (created on, created by, last modified on, last modified by)
    - add logging to backend
    - swagger openapi docs
    - google oauth2 login -> maybe need separate table to store oauth tokens (idk why u would need to but maybe?) -> will need to check to see if user is already created in APP.USER
- dashboard -> graphs
- home page
- breadcrumbs (?)
- add ability to create an account w/ code that sends to person's email
- reset password
- export spendings to csv
- popup on errors

## Known issues
- graph looks odd on mid-sized screens since navbar cuts into it
