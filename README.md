# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js


## TODO
- add suspense and error boundary 
- use Zod library for input validation
    - Only allow money amount inputs when editing or adding spendings
    - Need input cleansing and validation when editing or adding spendings
    - Need max cap on both amount and category
    - When adding or editing a spending and someone puts duplicate categories, collect them to be together (likely to be done on the backend)
- add ability to create an account 
- popup on errors
- home page

## Known issues
- deleting all spendings on the last page causes user to be stuck on a page with no spendings and can't navigate anywhere 
- when changing the number of items on the page, if the page the user currently is beyond the viewable pages, user gets stuck on page and can't navigate anywhere