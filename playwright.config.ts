import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'stag';

if (!process.env.TEST_WORKER_INDEX) {
  console.log(`\n🚀 RUNNING ON ENVIRONMENT: ${ENV.toUpperCase()} 🚀\n`);
}

dotenv.config({
  path: path.resolve(__dirname, `configs/.env.${ENV}`),
  quiet: true,
});

export default defineConfig({
  testDir: "./src/tests",
  snapshotDir: './src/utils/screenshots',
  snapshotPathTemplate: '{snapshotDir}/{projectName}/{testFileName}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'reports/playwright-report',
      open: 'never',
    }],
    ['allure-playwright', {
      resultsDir: 'reports/allure-report/allure-results',
      suiteTitle: false,
      detail: true,
      environmentInfo: {
        node_version: process.version,
        platform: process.platform,
        browsers: process.env.BROWSERS || 'all',
      }
    }],
    [
      "json",
      {
        outputFile: "reports/json-report/results.json",
      },
    ],
  ],
  outputDir: 'reports/test-results',

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1280, height: 720 }
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 }
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 }
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
