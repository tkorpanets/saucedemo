# demo-ghpages-report-secrets

🧪 **Demonstration project using Playwright + TypeScript** that showcases automated testing with GitHub Actions, secure secrets management, and publishing test reports via GitHub Pages.

---

## 🔧 Stack

- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **GitHub Actions**
- **GitHub Secrets**
- **GitHub Pages**

---

## 🗂 Structure

The project implements a classic Page Object approach with separation into:

- `pages/` — full pages (e.g. `loginPage`)
- `components/` — individual page elements/blocks (e.g. `alert`, `navbar`)

---

## 🚀 What this project demonstrates

1. ✅ **Using GitHub Actions secrets and variables** to securely store user credentials.
2. ✅ **Automatic HTML report generation** after Playwright test execution.
3. ✅ **Publishing reports via GitHub Pages** — accessible at:  
   [https://tkorpanets.github.io/demo-ghpages-report-secrets/](https://tkorpanets.github.io/demo-ghpages-report-secrets/)
4. ✅ **Ability to download the report as a `.zip` artifact** from [Actions → Artifacts].

---

## 🔐 Using GitHub Secrets

Secrets are managed through GitHub → **Settings → Secrets and Variables → Actions**:

| Name            | Description   |
| --------------- | ------------- |
| `STANDARD_USER` | User login    |
| `SECRET_SAUCE`  | User password |

A `users.json` file is generated dynamically before the tests run.

---

## 📦 Running tests manually

Manual test execution is enabled via GitHub Actions:

- Go to the **Actions** tab
- Select **Playwright Tests**
- Click **Run workflow**

---

## 📝 Note

This repository is for demonstration purposes only and is not intended for production use.

---
