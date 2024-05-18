# Spendings-Tracker
This repository holds the code for my spendings tracker app built with Java and React.js

## TODO
- add password requirements and form validations for login, send password reset email, password reset, and create account pages
	- Contains at least 1 number
	- Contains at least 1 special character
	- Contains at least 1 uppercase letter
	- Contains at least 1 lowercase letter
- clean up add/edit spending UI -> make category a set of predfined options dropdown -> can change datamodel to no longer store a string and just use some enum
- remove group by for bar and pie charts
- add fontawesome icons to relevant areas (signin button, username/password icons)
- dashboard -> graphs
- add empty state and error states everywhere
- password reset functionality
- delete account functionality
- home page -> cool parallax effect
- dark/light mode
- regenerate javadocs
- update ERD -> export from dbeaver
  - add junit tests for repo layer at minimum
- test from scratch

## Known issues
- when adding or updating amount of spending and it's fully highlighted, pressing any key will result in NaN
- google sign in button randomly resizes
