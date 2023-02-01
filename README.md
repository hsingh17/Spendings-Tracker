# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and Next.js


## TODO
- Need to do checking to see if a user is logged in. If they are, then redirect away from the login page. May require a new backend route. This check can also check to see if the jwt token is still in storage, if it is then they're logged in. ✅
- Filtering by date on frontend (start and end dates might be a calendar dropdown)
- Adding new spendings for the day on frontend ✅
- Rework API to return Map<Date, List<Spending>> ✅
- Edit old spendings ✅
- Charts on dashboard with d3.js
    - Panel that displays all time spendings (has multiple dropdowns to filter between all time, past month, etc.)
    - Line graph of spendings amounts in past N months
    - Bar chart of top N spending categories and their amounts
    - Pie chart of spending categories and their amounts
- Backend need to figure out a way to have a single encryption key instead of it getting a new one every server restart ✅
- Maybe put routes in constants file
- Only allow money amount inputs when editing or adding spendings
- Need input cleansing and validation when editing or adding spendings
- Need max cap on both amount and category
- When adding or editing a spending and someone puts duplicate categories, collect them to be together (likely to be done on the backend)
- after input has been added for the day, it should go to edit mode (NOT ADD)
- remove timestamp part in date ✅
- add tailwind
- add ability to create an account 
- use Zod library for input validation