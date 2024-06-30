# Spendings-Tracker

This repository holds the code for my spendings tracker app built with Java and React.js

## TODO

- clean up add/edit spending UI -> make category a set of predfined options dropdown -> can change datamodel to no longer store a string and just use some enum
  - update ui
    - total for the date at the top
    - inspiration: https://dribbble.com/shots/22860204-Add-item-modal-Clean-and-powerful
    - add/edit pops up a modal
  - make custom svgs
- remove group by for bar and pie charts
- add fontawesome icons to relevant areas (signin button, username/password icons)
- dashboard -> graphs
- add empty state and error states everywhere
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

- when adding or updating amount of spending and it's fully highlighted, pressing any key will result in NaN
- google sign in button randomly resizes
