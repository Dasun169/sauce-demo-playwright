import { test } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { itemData } from '../test-data/itemData';
import { checkoutData } from '../test-data/checkoutData';
import { logger } from '../utils/Logger';

test.describe('Checkout Flow Tests', { tag: ['@regression', '@checkout'] }, () => {

    test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);

        // Pre-condition: Add any number for item count (3 items) and explicitly proceed to Checkout Step One page
        const itemCount = 3;
        await productsPage.addProductsAndVerifyCartBadge(itemCount);
        await productsPage.navigateToCartPage();
        await cartPage.clickOnCheckoutButton();
    });

    // 1. Complete full end-to-end checkout flow
    test('TC_CHK_001 - Should successfully complete full end-to-end checkout flow', async ({ productsPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete }) => {
        logger.info("Starting Test: TC_CHK_001 - Should successfully complete full end-to-end checkout flow");

        // Step 1: User Information Submission
        await checkoutStepOnePage.validateCheckoutStepOnePage();
        await checkoutStepOnePage.fillUserDetails(
            checkoutData.validUser1.firstName,
            checkoutData.validUser1.lastName,
            checkoutData.validUser1.postalCode
        );
        await checkoutStepOnePage.clickContinueButton();

        // Step 2: Overview & Summary Validation
        await checkoutStepTwoPage.validateCheckoutStepTwoPage();

        const itemsCount = await checkoutStepTwoPage.getCheckoutItemsCount();
        const expectedItems = [itemData.item1, itemData.item2, itemData.item3, itemData.item4, itemData.item5, itemData.item6];

        // Dynamically loop sequentially checking the exact positions populated by the random array length
        for (let i = 0; i < itemsCount; i++) {
            await checkoutStepTwoPage.validateItemDetailsByPosition(i, expectedItems[i].name, expectedItems[i].price, "1");
        }

        await checkoutStepTwoPage.validateCheckoutStepTwoPageElements();
        await checkoutStepTwoPage.clickFinishButton();

        // Step 3: Order Completion Flow validation
        await checkoutComplete.validateCheckoutCompletePage();
        await checkoutComplete.checkoutComplatePageElementValidation();
        await checkoutComplete.clickBackToHomeButton();

        // Verify that the user is redirected to the products page
        await productsPage.validateProductsPage();
    });

    // 2. Parameterized Required field validation
    // This loop creates 4 distinct tests (TC_CHK_002 - TC_CHK_005)
    const validationScenarios = [
        { id: '002', label: 'All Empty', data: checkoutData.invalidUsers.allEmpty },
        { id: '003', label: 'First Name Empty', data: checkoutData.invalidUsers.firstNameEmpty },
        { id: '004', label: 'Last Name Empty', data: checkoutData.invalidUsers.lastNameEmpty },
        { id: '005', label: 'Postal Code Empty', data: checkoutData.invalidUsers.postalCodeEmpty }
    ];

    for (const scenario of validationScenarios) {
        test(`TC_CHK_${scenario.id} - Should validate error for ${scenario.label}`, async ({ checkoutStepOnePage }, testInfo) => {
            testInfo.annotations.push({
                type: 'Data-Driven Validation',
                description: `Scenario: ${scenario.label} | Expected Error: ${scenario.data.errorMessage}`
            });
            
            logger.info(`Starting Test Scenario: TC_CHK_${scenario.id} - ${scenario.label}`);
            await checkoutStepOnePage.validateCheckoutErrorMessage(
                scenario.data.firstName,
                scenario.data.lastName,
                scenario.data.postalCode,
                scenario.data.errorMessage
            );
        });
    }

    // 3. Verify checkout overview details before completion
    test('TC_CHK_006 - Should securely verify checkout overview details on step two before completion', async ({ checkoutStepOnePage, checkoutStepTwoPage }) => {
        logger.info("Starting Test: TC_CHK_006 - Should securely verify checkout overview details on step two before completion");

        await checkoutStepOnePage.fillUserDetails(
            checkoutData.validUser2.firstName,
            checkoutData.validUser2.lastName,
            checkoutData.validUser2.postalCode
        );
        await checkoutStepOnePage.clickContinueButton();

        await checkoutStepTwoPage.validateCheckoutStepTwoPage();

        const itemsCount = await checkoutStepTwoPage.getCheckoutItemsCount();
        const expectedItems = [itemData.item1, itemData.item2, itemData.item3, itemData.item4, itemData.item5, itemData.item6];

        // Dynamically parse exactly mapped positions iteratively
        for (let i = 0; i < itemsCount; i++) {
            await checkoutStepTwoPage.validateItemDetailsByPosition(i, expectedItems[i].name, expectedItems[i].price, "1");
        }

        await checkoutStepTwoPage.validateCheckoutStepTwoPageElements();
    });

    // 4. Verify successful order confirmation
    test('TC_CHK_007 - Should reliably assert successful order confirmation payload screens', async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete }) => {
        logger.info("Starting Test: TC_CHK_007 - Should reliably assert successful order confirmation payload screens");

        // Quickly push to confirmation state securely
        await checkoutStepOnePage.fillUserDetails(
            checkoutData.validUser3.firstName,
            checkoutData.validUser3.lastName,
            checkoutData.validUser3.postalCode
        );
        await checkoutStepOnePage.clickContinueButton();
        await checkoutStepTwoPage.clickFinishButton();

        await checkoutComplete.validateCheckoutCompletePage();
        await checkoutComplete.checkoutComplatePageElementValidation();
    });

    // 5. Verify checkout cancellation behavior gracefully handling returns accurately from step one
    test('TC_CHK_008 - Should accurately handle checkout flow cancellation from step one safely returning to cart page', async ({ cartPage, checkoutStepOnePage }) => {
        logger.info("Starting Test: TC_CHK_008 - Should accurately handle checkout flow cancellation from step one safely returning to cart page");

        await checkoutStepOnePage.clickCancelButton();
        await cartPage.validateCartPage();
    });

    // 6. Verify checkout cancellation behavior gracefully handling returns accurately from step two
    test('TC_CHK_009 - Should reliably handle checkout flow cancellation from step two navigating clearly back to products page', async ({ productsPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
        logger.info("Starting Test: TC_CHK_009 - Should reliably handle checkout flow cancellation from step two navigating clearly back to products page");

        // Fills User information to progress towards step two securely iteratively
        await checkoutStepOnePage.fillUserDetails(
            checkoutData.validUserCancel.firstName,
            checkoutData.validUserCancel.lastName,
            checkoutData.validUserCancel.postalCode
        );
        await checkoutStepOnePage.clickContinueButton();

        // Verifies step two cancellation redirects organically natively mapped
        await checkoutStepTwoPage.validateCheckoutStepTwoPage();
        await checkoutStepTwoPage.clickCancelButton();
        await productsPage.validateProductsPage();
    });
});
