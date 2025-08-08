## Type Checking

### `npx tsc --noEmit`

Runs the TypeScript compiler in **type-check only** mode without generating any `.js` output files.  
This ensures that your code and data (e.g., `users.json`) strictly match the defined TypeScript interfaces and types.

Useful for detecting:

- Missing required fields
- Extra or misspelled keys
- Incorrect value types

> This command is fast because it does not produce any compiled files — it only analyzes types.

## Using Allure Reporter with Playwright

To enable Allure reporting, install dependencies:
`npm install -D allure-playwright` and `npm install -g allure-commandline`.  
Allure requires Java — install JDK from https://adoptium.net/.  
In `playwright.config.ts` set `reporter: [['html'], ['allure-playwright']]`.  
Run tests with `npx playwright test --reporter=allure-playwright`, then generate the report with `allure generate ./allure-results -o ./allure-report` and open it using `allure open ./allure-report`.
