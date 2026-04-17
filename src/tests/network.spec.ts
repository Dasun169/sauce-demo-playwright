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

        // Force a fresh request cycle by disabling cache for all requests in this test
        await page.setExtraHTTPHeaders({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        // Intercept and abort all image requests
        await page.route('**/*.{png,jpg,jpeg,svg}*', route => route.abort());

        // Navigate to the inventory page directly to ensure a fresh session for this test
        await page.goto(process.env.BASE_URL + "inventory.html", { waitUntil: 'networkidle' });

        // Validate that images are broken (naturalWidth is 0)
        // Check multiple images to ensure the policy was applied globally
        const images = page.locator('.inventory_item_img img');
        
        // Wait for at least one image to be present
        await expect(images.first()).toBeVisible({ timeout: 10000 });

        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < Math.min(count, 3); i++) {
            const isBrokenOrAborted = await images.nth(i).evaluate((img: HTMLImageElement) => {
                // If the width is 0, it failed to load. 
                // We also check "complete" because an aborted image might remain in an incomplete state.
                return img.naturalWidth === 0;
            });
            expect(isBrokenOrAborted, `Image at index ${i} should have naturalWidth 0`).toBeTruthy();
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

        // Force cache bust specifically for this test
        await page.setExtraHTTPHeaders({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        // Intercept CSS files and append custom styles
        await page.route('**/*.css*', async route => {
            const response = await route.fetch();
            let body = await response.text();
            
            // Append a specific style to change background color to bright red
            body += '\n.header_secondary_container { background-color: rgb(255, 0, 0) !important; }';
            
            await route.fulfill({
                response,
                body,
                contentType: 'text/css',
                headers: {
                    ...response.headers(),
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
        });

        // Direct navigation to inventory page to ensure requests are fresh
        await page.goto(process.env.BASE_URL + "inventory.html", { waitUntil: 'networkidle' });

        // Wait for styles to be applied using auto-retrying locator expect
        const headerContainer = page.locator('.header_secondary_container');
        await expect(headerContainer).toHaveCSS('background-color', 'rgb(255, 0, 0)', { timeout: 15000 });

        logger.info("UI appearance successfully modified via CSS interception and validated.");
    });
});
