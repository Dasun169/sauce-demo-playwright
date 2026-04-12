import { test } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { filterData } from '../test-data/filterData';
import { itemData } from '../test-data/itemData';
import { logger } from '../utils/Logger';

test.describe('Products Page Validation Tests', { tag: ['@regression', '@products'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
        await loginPage.validateSuccessfulLogin();
    });

    test('TC_PROD_001 - Should load products page elements and items correctly', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_001 - Should load products page elements and items correctly");
        await productsPage.productsPageElementValidate();
        await productsPage.homePageItemCountValidate();
    });

    test('TC_PROD_002 - Should interact with the hamburger menu successfully', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_002 - Should interact with the hamburger menu successfully");
        await productsPage.hamburgerMenuCloseValidate();
    });

    test('TC_PROD_003 - Should navigate to About page from hamburger menu', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_003 - Should navigate to About page from hamburger menu");
        await productsPage.hamburgerMenuValidate();
        await productsPage.hamburgerMenuAboutNavigationValidation();
    });

    test('TC_PROD_004 - Should be able to add a product to the cart', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_004 - Should be able to add a product to the cart");
        await productsPage.addSauceLabsBackpackToCart();
        const price = await productsPage.retrieveSauceLabsBackpackItemPrice();
        const name = await productsPage.retrieveSauceLabsBackpackItemName();
        logger.info(`Added item: ${name} with price: ${price}`);
        await productsPage.navigateToCartPage();
    });

    test('TC_PROD_005 - Should sort items correctly', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_005 - Should sort items correctly");
        await productsPage.homePageItemFilterValidate();
        await productsPage.homePageItemFilterLowToHighValidate(filterData.lowToHighFirstItem);
        await productsPage.homePageItemFilterHighToLowValidate(filterData.highToLowFirstItem);
        await productsPage.homePageItemFilterZALocate(filterData.zToAFirstItem);
        await productsPage.homePageItemFilterAZValidate(filterData.aToZFirstItem);
    });

    test('TC_PROD_006 - Should validate footer texts and social media icons', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_006 - Should validate footer texts and social media icons");
        await productsPage.homePageFooterTextValidate();
        await productsPage.homePageFooterSocialMediaLinksValidate();
    });

    test('TC_PROD_007 - Should navigate to Facebook from footer', async ({ productsPage }) => {
        test.setTimeout(150_000);
        logger.info("Starting Test: TC_PROD_007 - Should navigate to Facebook from footer");
        await productsPage.homePageFooterFacebookNavigationValidation();
    });

    test('TC_PROD_008 - Should navigate to Twitter from footer', async ({ productsPage }) => {
        test.setTimeout(150_000);
        logger.info("Starting Test: TC_PROD_008 - Should navigate to Twitter from footer");
        await productsPage.homePageFooterTwitterNavigationValidation();
    });

    test('TC_PROD_009 - Should navigate to LinkedIn from footer', async ({ productsPage }) => {
        test.setTimeout(150_000);
        logger.info("Starting Test: TC_PROD_009 - Should navigate to LinkedIn from footer");
        await productsPage.homePageFooterLinkedInNavigationValidation();
    });

    test('TC_PROD_010 - Should validate details of all original products by position on product page', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_010 - Should validate details of all original products by position");

        // Ensure default sorting (A-Z) if the test implicitly relies on the standard initial view
        const itemsToVerify = [
            itemData.item1,
            itemData.item2,
            itemData.item3,
            itemData.item4,
            itemData.item5,
            itemData.item6
        ];

        await productsPage.validateAllProductDetailsSequentially(itemsToVerify);
    });

    test('TC_PROD_011 - Should navigate to each product detail page and validate details', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_011 - Should navigate to each product detail page and validate details");

        const itemsToVerify = [
            itemData.item1,
            itemData.item2,
            itemData.item3,
            itemData.item4,
            itemData.item5,
            itemData.item6
        ];

        await productsPage.validateProductDetailsByNavigationSequentially(itemsToVerify);
    });

    test('TC_PROD_012 - Should correctly update the cart badge sequentially when adding multiple products', async ({ productsPage }) => {
        logger.info("Starting Test: TC_PROD_012 - Should correctly update the cart badge sequentially when adding multiple products");
        await productsPage.addProductsAndVerifyCartBadge(6);
    });
});
