# Testing

Testing is handled by Playwright. For the most part end to end (E2E) testing is used, validating that all pages appear correct and can be used as intended by an end user.

## Running

To run the tests, start by setting up a dev environment as detailed in [Running](./Running.md).

Then run `npm run test` to run the full test suite. The results will automatically be opened in your default browser.

Once the test suite has been run, you can view the results, including full traces, with the command `npm run test:report`.

Tests should not be run against production builds as the tests cannot fully authenticate in production builds. An additional insecure credential manager is added in development to allow playwright to test authentication.

## Updating screenshots

The test suite makes use of visual tests to ensure that updates don't unintentionally alter the look of the website. In order to use these tests, known good reference screenshots are saved in the repository. Sometimes intended changes are made to the look/layout of the page, which will cause these visual tests to fail.

To update the reference screenshots to a new known good, simply run `npm run test:update`, which will run the full test suite, and replace the old reference screenshots with new ones.
