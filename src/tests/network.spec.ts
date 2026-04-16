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
        await page.route('**/*.{png,jpg,jpeg,svg}', route => route.abort());

        // Reload the page to see the effect
        await page.reload({ waitUntil: 'networkidle' });

        // Add a small buffer for the browser to render the "broken" state
        await page.waitForTimeout(1000);

        // Validate that images are broken (naturalWidth is 0)
        const isImageBroken = await productsPage.itemImageLocator().first().locator('img').evaluate((img: HTMLImageElement) => {
            return img.naturalWidth === 0;
        });

        expect(isImageBroken).toBeTruthy();
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
        await page.route('**/*.css', async route => {
            const response = await route.fetch();
            let body = await response.text();
            // Change background color of a specific UI element to bright red
            body += '\n.header_secondary_container { background-color: rgb(255, 0, 0) !important; }';
            await route.fulfill({
                response,
                body
            });
        });

        await page.reload();

        // Verify the injected style is applied
        const bgColor = await page.locator('.header_secondary_container').evaluate(el => getComputedStyle(el).backgroundColor);
        expect(bgColor).toBe('rgb(255, 0, 0)');

        logger.info("UI appearance successfully modified via CSS interception and validated.");
    });
});
