# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO
- clean up backend to use lombok instead of explicit getters and setters
- add password requirements and form validations for login, send password reset email, password reset, and create account pages
	- Contains at least 1 number
	- Contains at least 1 special character
	- Contains at least 1 uppercase letter
	- Contains at least 1 lowercase letter
- clean up add/edit spending UI -> make category a set of predfined options dropdown -> can change datamodel to no longer store a string and just use some enum
- remove group by for bar and pie charts
- dashboard -> graphs
- home page -> cool parallax effect
- update ERD -> export from dbeaver
- regenerate javadocs
  - add junit tests for repo layer at minimum
- add empty state and error states everywhere
- add fontawesome icons to relevant areas (signin button, username/password icons)
- test from scratch

## Known issues
- when adding or updating amount of spending and it's fully highlighted, pressing any key will result in NaN
