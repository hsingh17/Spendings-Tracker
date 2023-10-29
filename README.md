# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js


## TODO
- basic form validation
    - If user deletes all spendings from the form table and clicks 'Update', it should delete the SPENDING_USER_AGGR id associated to it as well (backend)
    - When adding or editing a spending and someone puts duplicate categories, collect them to be together (likely to be done on the backend)
- clean up backend api more
    - turn application.properties in to application.yml
    - add logging to backend
    - use enums where possible.
    - no @Autowired -> use construct autowiring
    - add logout functionality
- dashboard
- home page
- breadcrumbs (?)
- add ability to create an account w/ code that sends to person's email
- reset password
- export spendings to csv
- popup on errors

## Known issues
- delete modal looks wonky if not full sized screen