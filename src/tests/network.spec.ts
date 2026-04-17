import { test, expect } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { logger } from '../utils/Logger';

test.describe('Network & API Handling Tests', { tag: ['@regression', '@network'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
    });

    test('TC_NET_001 - Should simulate network failure by aborting image requests', async ({ page, productsPage }, testInfo) => {
        testInfo.annotations.push({
            type: 'Simulation',
            description: 'Aborts image requests at the protocol level to verify UI rendering of broken assets.'
        });
        logger.info("Starting Test: TC_NET_001 - Aborting image requests to simulate network failure");

        // Intercept and abort all image requests
        // Broaden the pattern to include all potential image types and handle query strings
        await page.route('**/*.{png,jpg,jpeg,svg}*', route => route.abort());

        // Reload the page to see the effect, ensuring we don't use cached assets from the login step
        // We navigate to the URL directly to ensure a fresh request cycle
        await page.goto(page.url(), { waitUntil: 'networkidle' });

        // Add a small buffer for the browser to finalize the "broken" state rendering
        await page.waitForTimeout(2000);

        // Validate that images are broken (naturalWidth is 0)
        // Check multiple images to ensure the policy was applied globally
        const images = page.locator('.inventory_item_img img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < Math.min(count, 3); i++) {
            const isBroken = await images.nth(i).evaluate((img: HTMLImageElement) => {
                return !img.complete || img.naturalWidth === 0;
            });
            expect(isBroken, `Image at index ${i} should be broken/blocked`).toBeTruthy();
        }

        logger.info("Successfully validated that images are blocked/broken via network abortion.");
    });

    test('TC_NET_002 - Should mock a network response (Status 500) for internal assets', async ({ page }) => {
        logger.info("Starting Test: TC_NET_002 - Simulating Server Error (500) for page navigation");

        // Mocking the inventory page to return a 500 status
        await page.route('**/inventory.html', route => {
            route.fulfill({
                status: 500,
                contentType: 'text/plain',
                body: 'Internal Server Error Simulated'
            });
        });

        // Trigger navigation to the blocked URL
        await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'commit' });

        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toContain('Internal Server Error Simulated');

        logger.info("Verified UI displays the mocked 500 error message.");
    });

    test('TC_NET_003 - Should intercept and modify CSS to change UI appearance', async ({ page }) => {
        logger.info("Starting Test: TC_NET_003 - Modifying CSS via network interception");

        // Intercept CSS files and append custom styles
        await page.route('**/*.css*', async route => {
            const response = await route.fetch();
            let body = await response.text();

            // Change background color of a specific UI element to bright red
            // We use !important to ensure it overrides existing styles
            body += '\n.header_secondary_container { background-color: rgb(255, 0, 0) !important; }';

            await route.fulfill({
                response,
                body,
                headers: {
                    ...response.headers(),
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
        });

        // Use a navigation that clears internal state more effectively than simple reload
        await page.goto(page.url(), { waitUntil: 'networkidle' });

        await page.waitForTimeout(2000);

        // Wait for the specific element to have the modified color (with retry logic built into expect)
        const headerContainer = page.locator('.header_secondary_container');
        await expect(headerContainer).toHaveCSS('background-color', 'rgb(255, 0, 0)', { timeout: 10000 });

        logger.info("UI appearance successfully modified via CSS interception and validated.");
    });
});
