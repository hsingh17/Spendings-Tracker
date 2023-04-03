# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js


## TODO
- Allow for complete deletion of day of spending -> need route on backend /api/delete-spending-by-date/{date}
- dont send password in user object
- add tailwind css on view-spendings, add-spendings, edit-spendings
- clean up code for frontend, backend, and data model once css is added
- Charts on dashboard with d3.js
    - Line graph of spendings amounts in past N months
    - Bar chart of top N spending categories and their amounts
    - Pie chart of spending categories and their amounts
    - Panel that displays all time spendings (has multiple dropdowns to filter between all time, past month, etc.)
- complete tailwind css
- use Zod library for input validation
    - Only allow money amount inputs when editing or adding spendings
    - Need input cleansing and validation when editing or adding spendings
    - Need max cap on both amount and category
    - When adding or editing a spending and someone puts duplicate categories, collect them to be together (likely to be done on the backend)
- add ability to create an account 
- popup on errors
- home page