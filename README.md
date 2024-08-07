# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO
- various updates
  - look into making a dynamic custom repo with JDBCTemplate
  - update deletemodal to use generic modal component
  - update/save button should be disabled when making API calls on savespendingsform
  - remove group by for bar and pie charts
  - add fontawesome icons to relevant areas (signin button, username/password icons)
  - add empty state and error states everywhere

- dashboard -> graphs

- settings

  - preferred currency type -> list and save spendings page will need to return the preferred currency types so UI can render correctly
  - preferred date format
  - delete account functionality -> in reality, we're going to simply set IS_ACTIVE to N

- maybe add a notes/memo field when adding spendings (would need to remove the unique category constraint)
- home page -> cool parallax effect
- dark/light mode
- make custom logo
- regenerate javadocs
- update ERD -> export from dbeaver
  - add junit tests for repo layer at minimum
- test from scratch

## Known issues

- google sign in button randomly resizes
