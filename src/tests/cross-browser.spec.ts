import { test, expect } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { logger } from '../utils/Logger';

// This sample test case is to verify the cross-browser and device viewport coverage
test.describe('Cross-Browser & Device Viewport Coverage Tests', { tag: ['@regression', '@cross-browser'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
    });

    test('TC_CB_001 - Should successfully execute critical user purchase flow natively across completely different browser engines', async ({ productsPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete }) => {
        logger.info("Starting Test: TC_CB_001 - End to End test evaluating engine performance natively");

        // 1. Products Page verification implicitly natively validating interactions
        await productsPage.validateProductsPage();
        await productsPage.addProductsAndVerifyCartBadge(2);

        // 2. Traversal mapping
        await productsPage.navigateToCartPage();
        await cartPage.validateCartPage();
        await cartPage.clickOnCheckoutButton();

        // 3. Checkout Validation
        await checkoutStepOnePage.fillUserDetails("Device", "Tester", "99999");
        await checkoutStepOnePage.clickContinueButton();

        await checkoutStepTwoPage.clickFinishButton();
        await checkoutComplete.validateCheckoutCompletePage();
        logger.info("Cross-browser critical rendering passed cleanly.");
    });

    test('TC_CB_002 - Should adjust dynamically to explicitly validate mobile boundaries safely', async ({ isMobile, productsPage }) => {
        logger.info(`Starting Test: TC_CB_002 - Validating viewport interactions mapped natively. Is Mobile: ${isMobile}`);

        // Asserts native resolution dynamically
        if (isMobile) {
            logger.info("Mobile device detected realistically. Validating Touch-centric UI specifically.");

            // Navigating burger menus is highly mobile-oriented securely mapping gestures
            await expect(productsPage.hamburgerMenuButtonLocator()).toBeVisible();
            await productsPage.hamburgerMenuButtonLocator().click();
            await expect(productsPage.hamburgerMenu()).toBeVisible();

            // Safe navigation verification natively testing sidebar UI handling
            await expect(productsPage.hamburgerCloseMenuButtonLocator()).toBeVisible();
            await productsPage.hamburgerCloseMenuButtonLocator().click();
            await expect(productsPage.hamburgerMenu()).not.toBeVisible();
        } else {
            logger.info("Desktop viewport mapped recursively. Validating widespread spatial UI directly.");

            // Verifying desktop resolution grid structure natively spans extensively
            await productsPage.productsPageElementValidate();
            const itemCount = await productsPage.itemImageLocator().count();
            expect(itemCount).toBe(6);
        }
    });
});
