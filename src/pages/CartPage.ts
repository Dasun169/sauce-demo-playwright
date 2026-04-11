import { Page, expect } from '@playwright/test';
import { logger } from '../utils/Logger';

export class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + 'cart.html';

    //Locators
    readonly cartPageValidationLocator = () => this.page.locator(`span.title`);
    readonly cartItemCatchLocator = () => this.page.locator(`//div[@class="cart_item"]`);
    readonly itemNameLocator = () => this.page.locator(`div.inventory_item_name`);
    readonly itemPriceLocator = () => this.page.locator(`div.inventory_item_price`);
    readonly itemRemoveButtonLocator = () => this.page.locator(`//button[@data-test="remove-sauce-labs-backpack"]`);
    readonly checkoutButtonLocator = () => this.page.locator(`button#checkout`);
    readonly continueShoppingButtonLocator = () => this.page.locator(`//button[@data-test="continue-shopping"]`);
    readonly cartBadgeLocator = () => this.page.locator(`//span[@data-test="shopping-cart-badge"]`);
    readonly genericRemoveButtonLocator = () => this.page.locator(`//button[text()="Remove"]`);

    //Methods
    /**
     * Validate the cart page
     * by checking if the cart page validation locator is visible.
     */
    async validateCartPage() {
        try {
            await expect(this.cartPageValidationLocator()).toHaveText('Your Cart');
            await expect(this.page).toHaveURL(process.env.BASE_URL + "cart.html");
            logger.info("Cart page validated successfully");
        }
        catch (error) {
            logger.error(`Cart page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the cart page directly
     * by navigating to the cart page URL.
     */
    async openCartPageDirectly() {
        await this.page.goto(this.url);
    }

    /**
     * Validate the item details by position inside the cart
     * @param position 0-based index of the item inside the cart
     * @param expectedName expected name of the item
     * @param expectedPrice expected price of the item
     */
    async validateItemDetailsByPosition(position: number, expectedName: string, expectedPrice: string) {
        try {
            await expect(this.itemNameLocator().nth(position)).toHaveText(expectedName);
            await expect(this.itemPriceLocator().nth(position)).toHaveText(expectedPrice);
            logger.info(`Cart item details effectively validated at position ${position}: ${expectedName}`);
        }
        catch (error) {
            logger.error(`Item validation failed at position ${position}: ${error}`);
            throw error;
        }
    }

    /**
     * by clicking the checkout button locator.
     */
    async clickOnCheckoutButton() {
        try {
            await expect(this.checkoutButtonLocator()).toBeVisible();
            await this.checkoutButtonLocator().click();
            logger.info("Checkout button clicked successfully");
        }
        catch (error) {
            logger.error(`Checkout button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the continue shopping button
     * by checking if the continue shopping button locator is visible.
     */
    async continueShoppingButtonValidation() {
        try {
            await expect(this.continueShoppingButtonLocator()).toBeVisible();
            await this.continueShoppingButtonLocator().click();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
            logger.info("Continue shopping button validated successfully");
        }
        catch (error) {
            logger.error(`Continue shopping button validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Remove item from cart
     * by clicking the remove button locator.
     */
    async removeItemFromCart() {
        try {
            let count = await this.cartItemCatchLocator().count();
            await this.genericRemoveButtonLocator().first().click();
            await expect(this.cartItemCatchLocator()).toHaveCount(count - 1);
            logger.info("Item removed from cart successfully");
        }
        catch (error) {
            logger.error(`Item removal failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the cart badge count
     * @param expectedCount The expected count in string format (e.g. '2')
     */
    async validateCartBadgeCount(expectedCount: string) {
        try {
            if (expectedCount === "0") {
                await expect(this.cartBadgeLocator()).not.toBeVisible();
            } else {
                await expect(this.cartBadgeLocator()).toHaveText(expectedCount);
            }
            logger.info(`Cart badge count efficiently validated as ${expectedCount}`);
        } catch (error) {
            logger.error(`Cart badge validation effectively failed: ${error}`);
            throw error;
        }
    }
}