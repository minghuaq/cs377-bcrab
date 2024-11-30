# Testing

Testing is handled by Playwright. For the most part end to end (E2E) testing is used, validating that all pages appear correct and can be used as intended by an end user.

## Running

To run the tests, a running version of the app must be made. This can either be achieved in development with the `npm run dev` script, or production builds can be tested with the `npm run start` script. Playwright is able to start it's own webserver, but a production build must be made first using `npm run build`.

Once a running app or production build is ready, simply run `npm run test` and the full test suite will be run. Once complete, a webpage will be opened showing full traces of every test and their statuses.

Once the test suite has been run, you can view the results, including full traces, with the command `npm run test:report`.

## Updating screenshots

The test suite makes use of visual tests to ensure that updates don't unintentionally alter the look of the website. In order to use these tests, known good reference screenshots are saved in the repository. Sometimes intended changes are made to the look/layout of the page, which will cause these visual tests to fail.

To update the reference screenshots to a new known good, simply run `npm run test:update`, which will run the full test suite, and replace the old reference screenshots with new ones.
