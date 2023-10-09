# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js


## TODO
- navbar
- basic form validation
    - If user deletes all spendings from the form table and clicks 'Update', it should delete the SPENDING_USER_AGGR id associated to it as well (backend)
    - When adding or editing a spending and someone puts duplicate categories, collect them to be together (likely to be done on the backend)
- add suspense and error boundary 
    - don't show navbar till user logs in
    - redirect to login if trying to reach page w/o being logged in
- dashboard
- home page
- breadcrumbs (?)
- add ability to create an account w/ code that sends to person's email
- reset password
- export spendings to csv
- popup on errors

## Known issues
- delete modal looks wonky if not full sized screen