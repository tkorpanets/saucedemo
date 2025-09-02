## Type Checking

### `npx tsc --noEmit`

Runs the TypeScript compiler in **type-check only** mode without generating any `.js` output files.  
Ensures that code strictly matches the defined TypeScript types and interfaces.

Detects:

- Missing required fields
- Extra or misspelled keys
- Incorrect value types

---

## Linting

### `npx eslint . --max-warnings=0`

Runs ESLint across the project with strict rules enabled.  
Prevents merging code that violates style or best practices.

Detects:

- Unused variables and imports
- Unsafe `any` usage
- Incorrect `const` / `let`
- Code style violations

> Using `--max-warnings=0` enforces zero tolerance: even warnings block the pipeline.

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
