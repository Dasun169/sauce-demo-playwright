import { Page, expect } from '@playwright/test';
import { logger } from '../utils/Logger';

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly userNameInputLocator = () => this.page.locator(`//input[@data-test="username"]`);
    readonly passwordInputLocator = () => this.page.locator(`//input[@data-test="password"]`);
    readonly loginButtonLocator = () => this.page.locator(`//input[@data-test="login-button"]`);
    readonly errorMessageLocator = () => this.page.locator(`//h3[@data-test="error"]`);

    //Methods
    /**
     * Entering the provided username and password.
     * @PARAM username the username used for login
     * @PARAM password the password used for login
     */
    async fillCredentialsAndClickLogin(username: string, password: string) {
        try {
            await expect(this.userNameInputLocator()).toBeVisible();
            await this.userNameInputLocator().fill(username);
            await this.passwordInputLocator().fill(password);
            await expect(this.loginButtonLocator()).toBeVisible();
            await this.loginButtonLocator().click();
            logger.info("Credentials filled and login button clicked");
        }
        catch (error) {
            logger.error(`Credentials filled and login button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Navigate to the Login Page
     */
    async navigateToLoginPage() {
        try {
            await this.page.goto(process.env.BASE_URL || "");
        }
        catch (error) {
            logger.error(`Navigation to login page failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the home page
     * by checking if the error message is visible and the url contains the home page.
     */
    async validateErrorMessageForHomePage() {
        try {
            await this.page.waitForTimeout(2000);
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
            logger.info("Error message for home page validated successfully");
        }
        catch (error) {
            logger.error(`Error message for home page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the cart page
     * by checking if the error message is visible and the url contains the cart page.
     */
    async validateErrorMessageForCartPage() {
        try {
            await this.page.waitForTimeout(2000);
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/cart.html' when you are logged in.");
            logger.info("Error message for cart page validated successfully");
        }
        catch (error) {
            logger.error(`Error message for cart page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the checkout step one page
     * by checking if the error message is visible and the url contains the checkout step one page.
     */
    async validateErrorMessageForCheckoutStepOnePage() {
        try {
            await this.page.waitForTimeout(2000);
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
            logger.info("Error message for checkout step one page validated successfully");
        }
        catch (error) {
            logger.error(`Error message for checkout step one page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the checkout step two page
     * by checking if the error message is visible and the url contains the checkout step two page.
     */
    async validateErrorMessageForCheckoutStepTwoPage() {
        try {
            await this.page.waitForTimeout(2000);
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.");
            logger.info("Error message for checkout step two page validated successfully");
        }
        catch (error) {
            logger.error(`Error message for checkout step two page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the checkout complete page
     * by checking if the error message is visible and the url contains the checkout complete page.
     */
    async validateErrorMessageForCheckoutCompletePage() {
        try {
            await this.page.waitForTimeout(2000);
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-complete.html' when you are logged in.");
            logger.info("Error message for checkout complete page validated successfully");
        }
        catch (error) {
            logger.error(`Error message for checkout complete page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Login Page
     * by checking if the login page validation locator is visible and the url contains the login page.
     */
    async validateLoginPageElements() {
        try {
            await expect(this.page).toHaveURL(process.env.BASE_URL + "");
            await expect(this.userNameInputLocator()).toBeVisible();
            await expect(this.passwordInputLocator()).toBeVisible();
            await expect(this.loginButtonLocator()).toBeVisible();
            logger.info("Login page validated successfully");
        }
        catch (error) {
            logger.error(`Login page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the successful login
     * by checking if the url contains the inventory page.
     */
    async validateSuccessfulLogin() {
        try {
            await expect(this.page).toHaveURL(/.*inventory.html/);
            logger.info("Successful login validated successfully");
        }
        catch (error) {
            logger.error(`Successful login validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for the login page
     * by checking if the error message is visible and the url contains the login page.
     * @param expectedMessage the error message to validate
     */
    async validateErrorMessage(expectedMessage: string) {
        try {
            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText(expectedMessage);
            logger.info("Error-message validated successfully");
        }
        catch (error) {
            logger.error(`Error-message validation failed: ${error}`);
            throw error;
        }
    }
}   