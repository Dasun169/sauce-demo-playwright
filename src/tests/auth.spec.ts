import { test } from '../../fixtures/fixture';
import { authData } from '../test-data/authData';
import { logger } from '../utils/Logger';

test.describe('Authentication Form Validation Tests', { tag: ['@regression', '@auth'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
    });

    test('TC_AUTH_001 - Should login successfully with valid credentials (validUser)', async ({ loginPage, productsPage }) => {
        logger.info("Starting Test: TC_AUTH_001 - Should login successfully with valid credentials");
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
        await loginPage.validateSuccessfulLogin();
        await productsPage.validateProductsPage();
    });

    test('TC_AUTH_002 - Should login successfully with valid credentials (problemUser)', async ({ loginPage, productsPage }) => {
        logger.info("Starting Test: TC_AUTH_002 - Should login successfully with valid credentials");
        await loginPage.fillCredentialsAndClickLogin(authData.problemUser.userName, authData.problemUser.password);
        await loginPage.validateSuccessfulLogin();
        await productsPage.validateProductsPage();
    });

    test('TC_AUTH_003 - Should login successfully with valid credentials (performanceGlitchUser)', async ({ loginPage, productsPage }) => {
        test.setTimeout(15000);
        logger.info("Starting Test: TC_AUTH_003 - Should login successfully with valid credentials");
        await loginPage.fillCredentialsAndClickLogin(authData.performanceGlitchUser.userName, authData.performanceGlitchUser.password);
        await loginPage.validateSuccessfulLogin();
        await productsPage.validateProductsPage();
    });

    test('TC_AUTH_004 - Should logout successfully', async ({ loginPage, productsPage }) => {
        logger.info("Starting Test: TC_AUTH_004 - Should logout successfully");
        await loginPage.fillCredentialsAndClickLogin(authData.validUser.userName, authData.validUser.password);
        await loginPage.validateSuccessfulLogin();
        await productsPage.validateProductsPage();
        await productsPage.hamburgerMenuValidate();
        await productsPage.hamburgerMenuLogoutNavigationValidation();
    });

    test('TC_AUTH_005 - Should show error for locked out user', { tag: ['@regression', '@sanity'] }, async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_005 - Should show error for locked out user");
        await loginPage.fillCredentialsAndClickLogin(authData.lockedOutUser.userName, authData.lockedOutUser.password);
        await loginPage.validateErrorMessage(authData.lockedOutUser.errorMessage);
    });

    test('TC_AUTH_006 - Should show error for invalid username/password', { tag: ['@regression', '@sanity'] }, async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_006 - Should show error for invalid username/password");
        await loginPage.fillCredentialsAndClickLogin(authData.invalidCredentials.userName, authData.invalidCredentials.password);
        await loginPage.validateErrorMessage(authData.invalidCredentials.errorMessage);
    });

    test('TC_AUTH_007 - Should show error when username is empty', { tag: ['@regression', '@sanity'] }, async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_007 - Should show error when username is empty");
        await loginPage.fillCredentialsAndClickLogin(authData.emptyUserName.userName, authData.emptyUserName.password);
        await loginPage.validateErrorMessage(authData.emptyUserName.errorMessage);
    });

    test('TC_AUTH_008 - Should show error when password is empty', { tag: ['@regression', '@sanity'] }, async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_008 - Should show error when password is empty");
        await loginPage.fillCredentialsAndClickLogin(authData.emptyPassword.userName, authData.emptyPassword.password);
        await loginPage.validateErrorMessage(authData.emptyPassword.errorMessage);
    });

    test('TC_AUTH_009 - Should show error when both fields are empty', { tag: ['@regression', '@sanity'] }, async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_009 - Should show error when both fields are empty");
        await loginPage.fillCredentialsAndClickLogin(authData.emptyFields.userName, authData.emptyFields.password);
        await loginPage.validateErrorMessage(authData.emptyFields.errorMessage);
    });
});