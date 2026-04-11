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
   git clone <repository-url>
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
*   **Screenshots**: Automatically captured on test failure and stored in `reports/playwright-report/data/`.
*   **Traces**: Full action-by-action traces are recorded. Open them via the HTML report or `playwright.dev/trace`.
*   **Videos**: Retained for failed tests in the `test-results/` directory.

---

## 📂 Project Structure
```text
sauceDemo/
├── configs/                # Environment configurations (.env files)
├── fixtures/               # Playwright custom fixtures for dependency injection
├── reports/                # Generated HTML and JSON reports
├── src/
│   ├── pages/              # Page Object Model (Locators & Actions)
│   ├── test-data/          # TypeScript-based DDT data files
│   ├── tests/              # Spec files (Auth, Cart, Checkout, etc.)
│   └── utils/              # Custom Loggers and helper functions
├── playwright.config.ts    # Main Playwright configuration
└── Dockerfile              # Containerization setup for CI/CD
```

---

## 🛡 Test Coverage
*   **Authentication**: Login/Logout, locked-out users, and error message validation.
*   **Products & Inventory**: Sorting (A-Z, Low-High), filtering, footer social links, and cart badge arithmetic.
*   **Checkout Flow**: Multi-step form validation, order summary precision, and cancellation paths.
*   **Network Intelligence**: Mocking asset failures (404/500) and protocols-level UI modification.
*   **Cross-Device**: Interaction testing on Pixel 5 and iPhone 12 viewports.

**Limitations:**
*   The suite currently interacts with the production URL directly (no local mock server).
*   Performance testing (Lighthouse) is not yet integrated.

---

## 🐞 Issues Found (SauceDemo Quirks)
1.  **Empty Postal Code**: The application accepts numeric and alphanumeric inputs inconsistently; currently, validation only checks for empty strings.
2.  **Navigation State**: On specific mobile viewports, the Sidebar menu requires an explicit wait/assertion as the animation sometimes delays visibility.
3.  **Checkout Pricing**: The subtotal does not dynamically update if items are modified via dev-tools, though the UI is stable enough for standard automation.

---

## 🔮 Future Improvements
*   **Visual Regression**: Integrate Pixel-to-Pixel comparison for the Inventory page.
*   **API Testing**: Add direct backend validation using `Playwright APIRequestContext`.
*   **Parallel Execution Tuning**: Optimize CI/CD workers for faster execution in Docker environments.
*   **Pre-commit Hooks**: Integrate `Husky` to run linting and smoke tests before code pushes.
