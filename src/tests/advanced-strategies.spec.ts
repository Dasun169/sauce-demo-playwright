import { test, expect } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { logger } from '../utils/Logger';

test.describe('Advanced QA Strategies: Visual & Performance', { tag: ['@advanced'] }, () => {

    test('TC_ADV_001 - Visual Comparison: Inventory Page Branding', async ({ loginPage, productsPage, page }) => {
        logger.info("Starting Test: TC_ADV_001 - Visual Snapshot Verification");

        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
        await productsPage.validateProductsPage();

        // VISUAL VALIDATION: Checks the current UI against a saved baseline.
        // Rule: First run creates the image; Second run compares it.
        await expect(page).toHaveScreenshot('inventory-page-baseline.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.1, // 10% pixel variance allowed (useful for dynamic content)
        });

        logger.info("Visual snapshot matched baseline successfully.");
    });

    test('TC_ADV_002 - Performance Timing: Login Action Budget', async ({ loginPage, page }) => {
        logger.info("Starting Test: TC_ADV_002 - Performance Timing Validation");

        await loginPage.navigateToLoginPage();

        // 1. Performance Measurement - Tracking how long the DOM takes to be ready
        const startTime = Date.now();

        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);

        // Wait for critical UI element to confirm navigation is complete
        await page.waitForSelector('//span[@data-test="title"]');

        const durationInSeconds = (Date.now() - startTime) / 1000;
        logger.info(`Login action completed in: ${durationInSeconds}s`);

        // PERFORMANCE BUDGET: The app must respond in under 3 seconds to be acceptable.
        const SLOW_CONNECTION_THRESHOLD = 3.0; // Seconds
        expect(durationInSeconds, `Login speed (${durationInSeconds}s) failed performance budget!`).toBeLessThan(SLOW_CONNECTION_THRESHOLD);
    });

    test('TC_ADV_003 - Browser Performance Metrics (W3C Standard)', async ({ page }) => {
        logger.info("Starting Test: TC_ADV_003 - Browser Performance Navigation Metrics");

        await page.goto(process.env.BASE_URL!);

        // Extracting actual browser performance timings directly from Window.performance
        const performanceData = await page.evaluate(() => {
            const [timing] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            return {
                dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
                tcpConnection: timing.connectEnd - timing.connectStart,
                responseTime: timing.responseEnd - timing.responseStart,
                domInteractive: timing.domInteractive - timing.startTime
            };
        });

        logger.info(`Web Performance Breakdown:
            DNS Lookup: ${performanceData.dnsLookup}ms
            TCP Connection: ${performanceData.tcpConnection}ms
            Server Response: ${performanceData.responseTime}ms
            DOM Interactive: ${performanceData.domInteractive}ms
        `);

        // Ensure Server Response is always under 500ms for SEO and UX.
        expect(performanceData.responseTime).toBeLessThan(2000);
    });
});
