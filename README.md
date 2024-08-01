# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- clean up add/edit spending UI -> make category a set of predfined options dropdown -> can change datamodel to no longer store a string and just use some enum
  - make custom svgs
- various updates
  - update GET endpoint that accepts filters to instead bind to an object (http://dolszewski.com/spring/how-to-bind-requestparam-to-object/)
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
