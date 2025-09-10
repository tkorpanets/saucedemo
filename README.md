# 🧪 Playwright + GitHub Pages Report Demo

> ✨ A complete demo showcasing **E2E testing with Playwright**, secret-based login, and **automated HTML reports** via GitHub Pages.

---

## 🚀 Project Highlights

- 🔐 Secure login with **GitHub Secrets**
- 📊 Live **Playwright HTML reports** hosted via **GitHub Pages**
- 🧱 Clean, modular **Page Object Model (POM)**
- 🧩 Powerful **custom fixtures**: login, logged user, prefilled cart, checkout
- ⚙️ Fully automated CI with **GitHub Actions**
- 🧪 Elegant step logging with a custom `@step` decorator
- 🐳 Dockerized CI/CD with official Playwright image or custom Dockerfile
- 📁 Downloadable `.zip` reports for local review

---

## 📦 Tech Stack

| Domain          | Stack                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| 🔧 Framework    | [Playwright](https://playwright.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| 🧱 Architecture | Page Object Model, Base Fixture Pattern, Centralized `app` access                     |
| ⚙️ CI/CD        | GitHub Actions, GitHub Pages, GitHub Secrets, Docker                                  |
| 🧪 Reporting    | Built-in Playwright HTML Report, Custom Step Decorator                                |
| 📂 Structure    | Modular pages/components, fixture-based setup                                         |

## 📄 GitHub Actions Overview

🔁 Trigger: **Manually via workflow_dispatch**

Steps:

🛠 Install dependencies
🔐 Read GitHub Secrets as environment variables
🧪 Run Playwright tests (with storageState, fixtures, etc.)
🗃 Upload HTML report as artifact
🌐 Deploy HTML report to GitHub Pages
✅ View live report:
🔗 tkorpanets.github.io/demo-playwright-typescript

---

## 🔐 GitHub Secrets Used

| Name            | Purpose        |
| --------------- | -------------- |
| `STANDARD_USER` | Login username |
| `SECRET_SAUCE`  | Login password |

> Secrets are consumed directly from GitHub Actions environment, not stored in the repo.

---

## 🧪 Example Test

```ts
loggedUserFixture('Products are sorted by price from low to high', async ({ app }) => {
  await app.header.sort.sortBy('Price (low to high)');
  await app.inventory.checkSortingByPrice('low to high');
});
```

📥 How to Run Tests Manually

1. Go to the Actions tab in GitHub
2. Select Playwright Tests
3. Click Run workflow

🐳 Dockerized CI

This project runs Playwright tests in two ways with GitHub Actions. One workflow uses the official Playwright container with browsers preinstalled for fast and simple CI. The other builds a custom Docker image from the provided Dockerfile, giving a production-like setup and the same environment locally and in CI.

Both workflows read environment variables and secrets such as BASE_URL and STANDARD_USER, run the tests, generate an HTML report, upload it as an artifact, and deploy it to GitHub Pages (gh-pages).

Files used: .github/workflows/playwright-in-container.yml, .github/workflows/playwright-dockerfile.yml, and Dockerfile (based on mcr.microsoft.com/playwright:vX.YY.Z-noble).

You can also run the same process locally by building the image and running it with ENV_TARGET and BASE_URL, mounting the playwright-report folder to access the generated HTML report.

💡 Notes
✅ Secrets never stored in repo
✅ HTML reports are auto-deployed
✅ Great as a starter for real-world project

📜 License
MIT © 2025 Taras Korpanets
