# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js


## TODO
- add this to api: https://stackoverflow.com/questions/68315809/is-it-possible-to-have-custom-error-response-with-jwt-authentication
- clean up frontend code add error handling to frontend code (each page will have a state of error, setError which it will pass to children and the useApi hook) and address any possible TODOs (use error boundaries https://blog.appsignal.com/2022/06/15/how-to-handle-errors-in-react.html)
- add tailwind css
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