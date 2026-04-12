# SauceDemo Automation Suite 🚀

A professional end-to-end automation framework built with **Playwright** and **TypeScript**, designed to validate the critical user journeys of the [SauceDemo](https://www.saucedemo.com/) application.

---

## 📖 Overview
This project implements a robust **Page Object Model (POM)** architecture to automate the testing of an e-commerce platform. The suite focuses on modularity, data-driven testing, and cross-browser reliability.

**Testing Approach:**
*   **Behavioral Focusing**: Validating negative/positive paths for Auth and Checkout.
*   **Network Resilience**: Using interception to simulate API errors and asset failures.
*   **Responsive Validation**: Dynamic viewport testing for both Desktop and Mobile.
*   **Data-Driven**: High coverage using localized `.ts` data parameters.

---

## 🛠 Prerequisites
Ensure you have the following installed locally:
*   **Node.js**: version `18.x` or higher (Recommended: `20+`)
*   **npm**: version `9.x` or higher
*   **Browsers**: Chromium, WebKit, and Firefox (installed via Playwright)

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dasun169/sauce-demo-playwright.git
   cd sauceDemo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Environment Setup:** Ensure your `.env.stag` (or relevant config) exists in the `configs/` directory with the `BASE_URL`.

---

## 🧪 Test Execution

### Run Full Suite
```bash
npx playwright test
```

### Run Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Headed Mode (Visual execution)
```bash
npx playwright test --headed
```

### Debug Mode (Playwright Inspector)
```bash
npx playwright test --debug
```

### Run by Tag (e.g., Regression)
```bash
npx playwright test --grep "@regression"
```

---

## 📊 Test Reports & Debugging

This project is configured for high-visibility debugging:
*   **HTML Reports**: Generated after every run. View with:
    ```bash
    npx playwright show-report
    ```
*   **Allure Reports**: Advanced visual reporting. Generate and view with:
    ```bash
    npm run allure:generate && npm run allure:open
    ```
    Or serve in real-time:
    ```bash
    npm run allure:serve
    ```
*   **Screenshots**: Automatically captured on test failure and stored in `reports/playwright-report/data/`.
*   **Traces**: Full action-by-action traces are recorded. Open them via the HTML report or `playwright.dev/trace`.
*   **Videos**: Retained for failed tests in the `test-results/` directory.

---

## 📂 Project Structure
```text
sauceDemo/
├── configs/                # Environment configurations
│   └── .env.stag           # Staging environment variables
├── fixtures/               # Playwright custom fixtures
│   └── fixture.ts          # Page object injection & setup
├── reports/                # Generated HTML, JSON and Allure reports
├── src/
│   ├── pages/              # Page Object Model (Locators & Actions)
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── test-data/          # TypeScript-based DDT data files
│   │   ├── authData.ts
│   │   ├── checkoutData.ts
│   │   ├── filterData.ts
│   │   └── itemData.ts
│   ├── tests/              # Spec files (Auth, Cart, Checkout, etc.)
│   │   ├── auth.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   ├── products.spec.ts
│   │   ├── network.spec.ts
│   │   ├── cross-browser.spec.ts
│   │   └── advanced-strategies.spec.ts
│   └── utils/              
│       ├── images/         # Storage for Visual baseline snapshots
│       └── Logger.ts       # Custom logging utility
├── playwright.config.ts    # Main Playwright configuration
└── Dockerfile              # Containerization setup for CI/CD
```

---

## 🛡 Test Coverage & Strategic Depth
*   **Functional**: Full Auth and Checkout state-machine validation.
*   **Data-Driven**: Parameterized loops covering 100% of negative form validation scenarios.
*   **Network Intelligence**: protocol-level mocking of HTTP 500/404 errors and CSS-injection testing.
*   **Cross-Device**: Mobile-specific touch-interaction testing on Pixel/iPhone viewports.
*   **Visual Regression**: Automated pixel-comparison tests for branding consistency (Stored in `src/utils/images`).
*   **Performance Benchmarking**: Integrated W3C Navigation timing and Custom Performance Budgets (Logins < 3s).

**Current Limitations (Strategic Debt):**
*   **Environment Dependency**: The suite currently targets the production demo environment directly. To maximize CI/CD stability, the next phase would move to **Mocked Service Workers (MSW)** to decouple tests from external uptime.
*   **Database Siloed**: Validation is currently restricted to the DOM. Integration of direct Database/API state verification is omitted due to the static nature of SauceDemo.
*   **Auth Handshake Latency**: Implementing Playwright `storageState` to bypass repetitive login flows.

---

## 🐞 Critical Observations (Bugs & Quirks)
1.  **Form Input Hygiene**: The "Postal Code" field lacks a regex restriction (accepts non-alphanumeric symbols). This was flagged as a **Medium Severity Bug** regarding data integrity.
2.  **Cart State Leakage**: Logout doesn't reliably clear local session data in the demo app; explicitly clearing `localStorage` between tests is a required workaround.
3.  **Visual Asset Fragility**: "Problem User" state results in swapped image assets. This is verified via network interception but suggests a need for **Visual Comparison** logic.
4.  **Performance Glitch Profile**: The `performance_glitch_user` forces a 5s API hang, requiring specific timeout handling to prevent false negatives.

---

## 🔮 Roadmap & Technical Maturity
*   **Accessibility (A11y)**: Integration of `@axe-core/playwright` to automate WCAG compliance checks on every page load.
*   **Contract Testing**: Implementing API contract validation to ensure the UI remains compatible with evolving backend schemas.
*   **GitOps/Husky**: Implementing `Husky` pre-commit hooks to run linting and "smoke" tags locally before code pushes to ensure 0% main-branch breakage.

---

### 📚 Additional Documentation
For a deep dive into the project's technical architecture, comprehensive test case inventory, and CI/CD workflow, please refer to:
👉 **[PROJECT_DETAILS.md](PROJECT_DETAILS.md)**
