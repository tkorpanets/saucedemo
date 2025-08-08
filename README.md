# 🧪 Playwright + GitHub Pages Report Demo

> ✨ A complete demo showcasing **E2E testing with Playwright**, secret-based login, and **automated HTML reports** via GitHub Pages.

---

## 🚀 Project Highlights

- 🔐 Secure login with **GitHub Secrets**
- 📊 Live **Playwright test reports** hosted via **GitHub Pages**
- 🧱 Clean, modular **Page Object Model (POM)**
- ⚙️ Fully automated CI with **GitHub Actions**
- 🧪 Elegant step logging with a custom `@step` decorator
- 📁 Downloadable `.zip` test reports for local review

---

## 📦 Tech Stack

| Domain          | Stack                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| 🔧 Framework    | [Playwright](https://playwright.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| 🧱 Architecture | Page Object Model, Base Fixture Pattern, Centralized `app` access                     |
| ⚙️ CI/CD        | GitHub Actions, GitHub Pages, GitHub Secrets                                          |
| 🧪 Reporting    | Built-in Playwright HTML Report, Step Decorators                                      |
| 📂 Structure    | Modular pages/components, fixture-based setup                                         |

---

## 🧱 Project Structure

📁 app/
├── page/ # Full page objects
├── component/ # Reusable components
├── abstractClasses/ # Base AppPage class
📁 fixtures/ # Custom fixtures: base, logged-in
📁 data/ # User JSON generated from secrets
📁 misc/ # Custom @step decorator
📁 tests/ # Organized test files

---

## 📄 GitHub Actions Overview

🔁 Trigger: **Manually via workflow_dispatch**

Steps:

1. 🛠 Install dependencies
2. 🔐 Inject secrets into `data/users.json`
3. 🧪 Run Playwright tests
4. 🗃 Upload report as artifact
5. 🌐 Deploy HTML report to GitHub Pages branch

✅ **View live report:**  
[🔗 tkorpanets.github.io/demo-ghpages-report-secrets](https://tkorpanets.github.io/demo-ghpages-report-secrets/)

---

## 🔐 GitHub Secrets Used

| Name            | Purpose        |
| --------------- | -------------- |
| `STANDARD_USER` | Login username |
| `SECRET_SAUCE`  | Login password |

> These secrets are injected into `data/users.json` before test execution.

---

## 🧪 Example Test

```ts
loggedJSONUserFixture('Products are sorted by price from low to high', async ({ app }) => {
  await app.header.sort.sortBy('Price (low to high)');
  await app.inventory.checkSortingByPrice('low to high');
});
```

📥 How to Run Tests Manually

1. Go to the Actions tab in GitHub
2. Select Playwright Tests
3. Click Run workflow

💡 Notes
✅ Secrets never stored in repo
✅ HTML reports are auto-deployed
✅ Great as a starter for real-world project

📜 License
MIT © 2025 Taras Korpanets


