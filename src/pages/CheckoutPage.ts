import { Page, expect } from "@playwright/test";
import { logger } from "../utils/Logger"; // Updated to correctly match Logger.ts casing

export class CheckoutStepOnePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-step-one.html";

    //Locators
    readonly checkoutStepOnePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly firstNameLocator = () => this.page.locator(`//input[@id="first-name"]`);
    readonly lastNameLocator = () => this.page.locator(`//input[@id="last-name"]`);
    readonly postalCodeLocator = () => this.page.locator(`//input[@id="postal-code"]`);
    readonly continueButtonLocator = () => this.page.locator(`//input[@id="continue"]`);
    readonly cancelButtonLocator = () => this.page.locator(`//button[@data-test="cancel"]`);
    readonly errorMessageLocator = () => this.page.locator(`//h3[@data-test="error"]`);

    //Methods
    /**
     * Validate the Checkout Step One Page
     * by checking if the checkout step one page validation locator is visible and the url contains the checkout step one page.
     */
    async validateCheckoutStepOnePage() {
        try {
            await expect(this.checkoutStepOnePageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
            logger.info("Checkout step one page validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step one page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Fill the user details in the checkout step one page
     * by entering the first name, last name and postal code.
     * @PARAM firstName the first name of the user
     * @PARAM lastName the last name of the user
     * @PARAM postalCode the postal code of the user
     */
    async fillUserDetails(firstName: string, lastName: string, postalCode: string) {
        try {
            await expect(this.firstNameLocator()).toBeVisible();
            await this.firstNameLocator().fill(firstName);
            await expect(this.lastNameLocator()).toBeVisible();
            await this.lastNameLocator().fill(lastName);
            await expect(this.postalCodeLocator()).toBeVisible();
            await this.postalCodeLocator().fill(postalCode);
            logger.info("User details filled successfully");
        }
        catch (error) {
            logger.error(`User details filling failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the continue button in the checkout step one page
     * by clicking the continue button.
     */
    async clickContinueButton() {
        try {
            await expect(this.continueButtonLocator()).toBeVisible();
            await this.continueButtonLocator().click();
            logger.info("Continue button clicked successfully");
        }
        catch (error) {
            logger.error(`Continue button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the cancel button in the checkout step one page
     * by clicking the cancel button.
     */
    async clickCancelButton() {
        try {
            await expect(this.cancelButtonLocator()).toBeVisible();
            await this.cancelButtonLocator().click();
            logger.info("Cancel button clicked successfully");
        }
        catch (error) {
            logger.error(`Cancel button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout step one page directly
     * by navigating to the checkout step one page URL.
     */
    async openCheckoutStepOnePageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout step one page opened successfully");
        }
        catch (error) {
            logger.error(`Checkout step one page opened failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for empty first name in the checkout step one page
     * by checking if the error message is visible and the url contains the checkout step one page.
     * @param firstName the first name of the user
     * @param lastName the last name of the user
     * @param postalCode the postal code of the user
     * @param expectedError the expected error message
     */
    async validateCheckoutErrorMessage(firstName: string, lastName: string, postalCode: string, expectedError: string) {
        try {
            await expect(this.firstNameLocator()).toBeVisible();
            await this.firstNameLocator().fill(firstName);

            await expect(this.lastNameLocator()).toBeVisible();
            await this.lastNameLocator().fill(lastName);

            await expect(this.postalCodeLocator()).toBeVisible();
            await this.postalCodeLocator().fill(postalCode);

            await expect(this.continueButtonLocator()).toBeVisible();
            await this.continueButtonLocator().click();

            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText(expectedError);
            logger.info("Checkout error message validated successfully");
        }
        catch (error) {
            logger.error(`Checkout error message validation failed: ${error}`);
            throw error;
        }
    }
}


export class CheckoutStepTwoPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-step-two.html";

    //Locators
    readonly checkoutStepTwoPageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly itemNameLocator = () => this.page.locator(`//div[@class="inventory_item_name"]`);
    readonly itemPriceLocator = () => this.page.locator(`//div[@class="inventory_item_price"]`);
    readonly itemQuantityLocator = () => this.page.locator(`//div[@class="cart_quantity"]`);
    readonly finishButtonLocator = () => this.page.locator(`//button[@id="finish"]`);
    readonly cancelButtonLocator = () => this.page.locator(`//button[@data-test="cancel"]`);

    readonly paymentInformationLocator = () => this.page.locator(`//div[@data-test="payment-info-label"]`);
    readonly paymentInformationValueLocator = () => this.page.locator(`//div[@data-test="payment-info-value"]`);
    readonly shippingInformationLocator = () => this.page.locator(`//div[@data-test="shipping-info-label"]`);
    readonly shippingInformationValueLocator = () => this.page.locator(`//div[@data-test="shipping-info-value"]`);
    readonly priceInformationLocator = () => this.page.locator(`//div[@data-test="total-info-label"]`);
    readonly priceInformationValueLocator = () => this.page.locator(`//div[@data-test="subtotal-label"]`);

    //Methods
    /**
     * Validate the Checkout Step Two Page
     * by checking if the checkout step two page validation locator is visible and the url contains the checkout step two page.
     */
    async validateCheckoutStepTwoPage() {
        try {
            await expect(this.checkoutStepTwoPageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-step-two.html");
            logger.info("Checkout step two page validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the item details in the checkout step two page securely by exact native index array mapping
     * @param position the zero-based array index position exactly mapped
     * @param itemName the expected name of the item natively
     * @param itemPrice the expected precise price of the item natively
     * @param itemQuantity the explicit quantity of the natively mapped item
     */
    async validateItemDetailsByPosition(position: number, itemName: string, itemPrice: string, itemQuantity: string) {
        try {
            await expect(this.itemNameLocator().nth(position)).toHaveText(itemName);
            await expect(this.itemPriceLocator().nth(position)).toHaveText(itemPrice);
            await expect(this.itemQuantityLocator().nth(position)).toHaveText(itemQuantity);
            logger.info("Item details validated successfully");
        }
        catch (error) {
            logger.error(`Item details validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Get the exact number of active order items directly populated organically in checkout step two page
     * @returns the integer sum of populated items natively active
     */
    async getCheckoutItemsCount() {
        return await this.itemNameLocator().count();
    }

    /**
     * Click the finish button in the checkout step two page
     * by clicking the finish button.
     */
    async clickFinishButton() {
        try {
            await expect(this.finishButtonLocator()).toBeVisible();
            await this.finishButtonLocator().click();
            logger.info("Finish button clicked successfully");
        }
        catch (error) {
            logger.error(`Finish button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the cancel button in the checkout step two page
     * by clicking the cancel button.
     */
    async clickCancelButton() {
        try {
            await expect(this.cancelButtonLocator()).toBeVisible();
            await this.cancelButtonLocator().click();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
            logger.info("Cancel button clicked successfully");
        }
        catch (error) {
            logger.error(`Cancel button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate element in the Checkout Sep Two Page
     */
    async validateCheckoutStepTwoPageElements() {
        try {
            await expect(this.paymentInformationLocator()).toBeVisible();
            await expect(this.paymentInformationValueLocator()).toBeVisible();
            await expect(this.paymentInformationValueLocator()).toContainText("SauceCard #31");
            await expect(this.shippingInformationLocator()).toBeVisible();
            await expect(this.shippingInformationValueLocator()).toBeVisible();
            await expect(this.shippingInformationValueLocator()).toContainText("Free Pony Express Delivery!");
            await expect(this.priceInformationLocator()).toBeVisible();
            await expect(this.priceInformationValueLocator()).toBeVisible();
            await expect(this.priceInformationValueLocator()).toContainText("Item total:");
            logger.info("Checkout step two page elements validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page elements validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout step two page directly
     * by navigating to the checkout step two page URL.
     */
    async openCheckoutStepTwoPageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout step two page opened successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page opened failed: ${error}`);
            throw error;
        }
    }
}


export class CheckoutComplete {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-complete.html";

    //Locators
    readonly checkoutCompletePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly backToHomeButtonLocator = () => this.page.locator(`//button[@id="back-to-products"]`);
    readonly thankYouMessageLocator = () => this.page.locator(`//h2[@data-test="complete-header"]`);
    readonly completeTextMessageLocator = () => this.page.locator(`//div[@data-test="complete-text"]`);

    //Methods
    /**
     * Validate the Checkout Complete Page
     * by checking if the checkout complete page validation locator is visible and the url contains the checkout complete page.
     */
    async validateCheckoutCompletePage() {
        await expect(this.checkoutCompletePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-complete.html");
        await expect(this.thankYouMessageLocator()).toBeVisible();
        logger.info("Checkout complete page validated successfully");
    }

    /**
     * Click the back to home button in the checkout complete page
     * by clicking the back to home button.
     */
    async clickBackToHomeButton() {
        await expect(this.backToHomeButtonLocator()).toBeVisible();
        await this.backToHomeButtonLocator().click();
        logger.info("Back to home button clicked successfully");
    }

    /**
     * Validate the checkout complete page element visibility
     * by checking if the checkout complete page validation locator, back to home button, thank you message and complete text locators are visible.
     */
    async checkoutComplatePageElementValidation() {
        try {
            await expect(this.checkoutCompletePageValidationLocator()).toBeVisible();
            await expect(this.backToHomeButtonLocator()).toBeVisible();
            await expect(this.thankYouMessageLocator()).toBeVisible();
            await expect(this.thankYouMessageLocator()).toHaveText("Thank you for your order!");
            await expect(this.completeTextMessageLocator()).toBeVisible();
            await expect(this.completeTextMessageLocator()).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
            logger.info("Checkout complete page element validation successful");
        }
        catch (error) {
            logger.error(`Checkout complete page element validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout complete page directly
     * by navigating to the checkout complete page URL.
     */
    async openCheckoutCompletePageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout complete page opened directly successfully");
        }
        catch (error) {
            logger.error(`Checkout complete page opened directly failed: ${error}`);
            throw error;
        }
    }
}
