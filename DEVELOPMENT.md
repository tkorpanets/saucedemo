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

## Run with Docker locally

Build the image:
docker build -t demo-pw-e2e .

Run tests with environment variables from .env.dev or .env.stage (stored under config/):

Dev environment
docker run --rm --shm-size=1g --env-file ${PWD}\config\.env.dev -v ${PWD}\playwright-report:/app/playwright-report demo-pw-e2e

Stage environment
docker run --rm --shm-size=1g --env-file ${PWD}\config\.env.stage -v ${PWD}\playwright-report:/app/playwright-report demo-pw-e2e

View Playwright Report
After the run, the HTML report is available in the playwright-report folder.
Windows (PowerShell): start .\playwright-report\index.html
macOS: open ./playwright-report/index.html
Linux: xdg-open ./playwright-report/index.html
