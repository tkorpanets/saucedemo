# demo-ghpages-report-secrets

🧪 **Demonstration project using Playwright + TypeScript** that showcases automated testing with GitHub Actions, secure secrets management, and publishing test reports via GitHub Pages.

---

## 🔧 Stack (short with descriptions)

- **Playwright** — end-to-end testing framework
- **TypeScript** — strongly-typed JavaScript
- **Page Object Model (POM)** — separation into reusable page and component objects
- **GitHub Actions** — CI/CD pipeline for running tests
- **GitHub Secrets** — secure storage of credentials
- **GitHub Pages** — publishing Playwright HTML report
- **Fixtures system** — using a shared `baseFixture` that is extended by `app`
- **Global `app` class** — central access point to all page and component objects
- **Custom `@step` decorator** — for enhanced reporting (step names shown in Playwright trace logs)

---

## 🔧 Stack (grouped by domain)

**Core Technologies:**

- Playwright
- TypeScript
- Page Object Model (POM)

**Architecture & Design:**

- Base Fixture pattern (`baseFixture` → `app`)
- Global `app` class for centralized access
- Custom `@step` decorator for logging steps in reports

**CI & DevOps:**

- GitHub Actions (workflow_dispatch, test runner, CI)
- GitHub Secrets (secure credential injection)
- GitHub Pages (static hosting for Playwright HTML reports)

---

## 🔧 Stack (compact resume-style)

Playwright · TypeScript · POM · GitHub Actions · GitHub Secrets · GitHub Pages · baseFixture · app class · @step decorator

---

## 🗂 Structure

The project uses a Page Object pattern with clear separation into:

- `pages/` — complete pages (e.g. `loginPage`)
- `components/` — reusable UI elements (e.g. `alert`, `navbar`)
- `fixtures/` — contains `baseFixture` extended via `app`
- `app.ts` — global wrapper that exposes page and component objects

---

## 🚀 What this project demonstrates

1. ✅ **Use of GitHub Actions secrets and variables** to securely store login credentials
2. ✅ **Automatic generation of HTML test reports using Playwright**
3. ✅ **Publishing reports through GitHub Pages**  
   👉 [https://tkorpanets.github.io/demo-ghpages-report-secrets/](https://tkorpanets.github.io/demo-ghpages-report-secrets/)
4. ✅ **Downloadable `.zip` test report artifact** available in [Actions → Artifacts]

---

## 🔐 GitHub Secrets

Secrets used in `.github/workflows/playwright.yml`:

| Name            | Description   |
| --------------- | ------------- |
| `STANDARD_USER` | User login    |
| `SECRET_SAUCE`  | User password |

A `data/users.json` file is generated dynamically from these values before running the tests.

---

## 📦 How to run tests manually

Manual test execution is enabled via GitHub Actions:

- Go to the **Actions** tab
- Select **Playwright Tests**
- Click **Run workflow**

---

## 📄 Notes

This project is for demonstration and educational purposes only.  
It is not intended for production use or storing real credentials.

---
