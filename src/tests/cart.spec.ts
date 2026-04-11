import { test } from '../../fixtures/fixture';
import { expect } from '@playwright/test';
import { authData } from '../test-data/authData';
import { itemData } from '../test-data/itemData';
import { logger } from '../utils/Logger';

test.describe('Cart Page Validation Tests', { tag: ['@regression', '@cart'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
        await loginPage.validateSuccessfulLogin();
    });

    // 1. login as a valid user, select some products based on the name and then go to the cart page and validate the cart product details
    test('TC_CART_001 - Should validate items in cart page', async ({ productsPage, cartPage }) => {
        logger.info("Starting Test: TC_CART_001 - Should validate items in cart page");

        const itemsToVerify = [
            itemData.item1,
            itemData.item2,
            itemData.item3
        ];

        // Adds 3 items securely sequentially
        await productsPage.addProductsAndVerifyCartBadge(itemsToVerify.length);
        await productsPage.navigateToCartPage();
        await cartPage.validateCartPage();

        // Loop through and validate all items efficiently based on their added sequence positions native ordering
        for (let i = 0; i < itemsToVerify.length; i++) {
            await cartPage.validateItemDetailsByPosition(i, itemsToVerify[i].name, itemsToVerify[i].price);
        }
    });

    // 2. In cart page according to the item count verify cart badge count and when reduce the count then validate the cart badge reduce align with this.
    test('TC_CART_002 - Should dynamically update cart badge count when items are removed', async ({ productsPage, cartPage }) => {
        logger.info("Starting Test: TC_CART_002 - Should dynamically update cart badge count when items are removed");
        await productsPage.addProductsAndVerifyCartBadge(3); // Adds 3 elements sequentially
        await productsPage.navigateToCartPage();

        await cartPage.validateCartBadgeCount("3");
        await cartPage.removeItemFromCart();
        await cartPage.validateCartBadgeCount("2");
        await cartPage.removeItemFromCart();
        await cartPage.validateCartBadgeCount("1");
        await cartPage.removeItemFromCart();
        // Once 0, the badge completely disappears in SauceDemo
        await cartPage.validateCartBadgeCount("0");
    });

    // 3. Validate continue shoping button with adding some products again and verify cart badge.
    test('TC_CART_003 - Should navigate correctly using Continue Shopping and retain cart badge', async ({ productsPage, cartPage }) => {
        logger.info("Starting Test: TC_CART_003 - Should navigate correctly using Continue Shopping and retain cart badge");
        await productsPage.addProductsAndVerifyCartBadge(2);
        await productsPage.navigateToCartPage();

        await cartPage.continueShoppingButtonValidation();
        // Add 1 more item (total 3). We explicitly use the generic add locator for the very next product
        await productsPage.genericAddToCartButtonLocator().first().click();
        await cartPage.validateCartBadgeCount("3");
    });

    // 4. Validate checkout naviagation after add product to the cart and verify navigate to this 'checkout-step-one'
    test('TC_CART_004 - Should navigate to checkout step one appropriately', async ({ productsPage, cartPage, page }) => {
        logger.info("Starting Test: TC_CART_004 - Should navigate to checkout step one appropriately");
        await productsPage.addProductsAndVerifyCartBadge(1);
        await productsPage.navigateToCartPage();
        await cartPage.clickOnCheckoutButton();

        // Assert url dynamically contains the checkout page endpoint
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        logger.info("Checkout navigation effectively validated successfully");
    });
});
