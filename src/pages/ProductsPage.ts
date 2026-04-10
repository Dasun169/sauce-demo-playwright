import { Page, expect } from '@playwright/test';
import { logger } from '../utils/Logger';

export class ProductsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "inventory.html";

    //Locators
    readonly homePageValidationLocator = () => this.page.locator(`span.title`);
    readonly cartIconLocator = () => this.page.locator(`//div[@id="shopping_cart_container"]`);
    readonly sauceLabsBackpackItemLocator = () => this.page.locator(`//a[@id="item_4_title_link"]//div`);
    readonly sauceLabsBackpackPriceLocator = () => this.page.locator(`.inventory_item_price`).nth(0);
    readonly addToCartButtonLocator = () => this.page.locator(`button#add-to-cart-sauce-labs-backpack`);
    readonly genericAddToCartButtonLocator = () => this.page.locator(`//button[text()="Add to cart"]`);
    readonly hamburgerMenuButtonLocator = () => this.page.locator(`//button[@id="react-burger-menu-btn"]`);
    readonly hamburgerMenu = () => this.page.locator(`//nav[@class="bm-item-list"]`);
    readonly hamburgerAllItemsButtonLocator = () => this.page.locator(`//a[@id="inventory_sidebar_link"]`);
    readonly hamburgerAboutButtonLocator = () => this.page.locator(`//a[@id="about_sidebar_link"]`);
    readonly hamburgerLogoutButtonLocator = () => this.page.locator(`//a[@id="logout_sidebar_link"]`);
    readonly hamburgerResetAppStateButtonLocator = () => this.page.locator(`//a[@id="reset_sidebar_link"]`);
    readonly hamburgerCloseMenuButtonLocator = () => this.page.locator(`//button[@id="react-burger-cross-btn"]`);
    readonly itemFilterButtonLocator = () => this.page.locator(`//select[@data-test="product-sort-container"]`);
    readonly itemImageLocator = () => this.page.locator(`//div[@class="inventory_item_img"]`);
    readonly itemLabelLocator = () => this.page.locator(`//div[@class="inventory_item_label"]`);
    readonly itemPriceBarLocator = () => this.page.locator(`//div[@class="pricebar"]`);
    readonly itemNameLocator = () => this.page.locator(`//div[@data-test="inventory-item-name"]`);
    readonly itemDescLocator = () => this.page.locator(`//div[@data-test="inventory-item-desc"]`);
    readonly itemPriceLocator = () => this.page.locator(`//div[@data-test="inventory-item-price"]`);
    readonly cartBadgeLocator = () => this.page.locator(`//span[@data-test="shopping-cart-badge"]`);

    //Filter options
    readonly filterOptionAZLocator = () => this.page.locator(`//option[@value="az"]`);
    readonly filterOptionZALocator = () => this.page.locator(`//option[@value="za"]`);
    readonly filterOptionLowToHighLocator = () => this.page.locator(`//option[@value="lohi"]`);
    readonly filterOptionHighToLowLocator = () => this.page.locator(`//option[@value="hilo"]`);

    //Footer Locators
    readonly footerTextLocator = () => this.page.locator(`//div[@data-test="footer-copy"]`);
    readonly footerFacebookIconLocator = () => this.page.locator(`//a[@data-test="social-facebook"]`);
    readonly footerTwitterIconLocator = () => this.page.locator(`//a[@data-test="social-twitter"]`);
    readonly footerLinkedInIconLocator = () => this.page.locator(`//a[@data-test="social-linkedin"]`);

    //Methods
    /**
     * Validate the Products Page
     * by checking if the products page validation locator is visible and the url contains the inventory page.
     */
    async validateProductsPage() {
        try {
            await expect(this.homePageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
            logger.info("Products page validated successfully");
        }
        catch (error) {
            logger.error(`Products page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the Products Page directly
     * by navigating to the products page.
     */
    async openProductsPageDirectly() {
        try {
            await this.page.goto(this.url);
        }
        catch (error) {
            logger.error(`Products page opened failed: ${error}`);
            throw error;
        }
    }

    /**
     * Add the Sauce Labs Backpack to the cart
     * by clicking the add to cart button.
     */
    async addSauceLabsBackpackToCart() {
        try {
            await expect(this.sauceLabsBackpackItemLocator()).toBeVisible();
            await this.addToCartButtonLocator().click();
            logger.info("Sauce labs backpack added to cart successfully");
        }
        catch (error) {
            logger.error(`Sauce labs backpack add to cart failed: ${error}`);
            throw error;
        }
    }

    /**
     * Add multiple products to the cart and verify the cart badge updates accordingly.
     * @param numItems The number of items to add (max 6).
     */
    async addProductsAndVerifyCartBadge(numItems: number) {
        try {
            for (let i = 0; i < numItems; i++) {
                await this.genericAddToCartButtonLocator().first().click();
                await expect(this.cartBadgeLocator()).toHaveText((i + 1).toString());
                logger.info(`Added item count ${i + 1} to cart and cart badge properly validated.`);
            }
            logger.info(`Successfully added ${numItems} items and validated cart badge updates.`);
        } catch (error) {
            logger.error(`Cart badge sequential addition validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Navigate to the Cart Page
     * by clicking the cart icon.
     */
    async navigateToCartPage() {
        try {
            await expect(this.cartIconLocator()).toBeVisible();
            await this.cartIconLocator().click();
            logger.info("Cart page navigated successfully");
        }
        catch (error) {
            logger.error(`Cart page navigation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Name
     * by getting the text content of the sauce labs backpack item locator.
     * @RETURN string the name of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemName() {
        try {
            const itemName = await this.sauceLabsBackpackItemLocator().textContent() ?? "";
            logger.info("Sauce labs backpack item name retrieved successfully");
            return itemName;
        }
        catch (error) {
            logger.error(`Sauce labs backpack item name retrieval failed: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Price
     * by getting the text content of the sauce labs backpack price locator.
     * @RETURN string the price of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemPrice() {
        try {
            const itemPrice = await this.sauceLabsBackpackPriceLocator().textContent() ?? "";
            logger.info("Sauce labs backpack item price retrieved successfully");
            return itemPrice;
        }
        catch (error) {
            logger.error(`Sauce labs backpack item price retrieval failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Products Page Elements
     * by checking if the products page validation locator is visible and the url contains the inventory page.
     */
    async productsPageElementValidate() {
        try {
            await expect(this.homePageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
            await expect(this.cartIconLocator()).toBeVisible();
            await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            logger.info("Products page elements validated successfully");
        }
        catch (error) {
            logger.error(`Products page elements validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Hamburger Menu
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuValidate() {
        try {
            await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
            await this.hamburgerMenuButtonLocator().click();
            await expect(this.hamburgerMenu()).toBeVisible();
            logger.info("Hamburger menu validated successfully");
        }
        catch (error) {
            logger.error(`Hamburger menu validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Hamburger Menu Close
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuCloseValidate() {
        try {
            await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
            await this.hamburgerMenuButtonLocator().click();
            await expect(this.hamburgerMenu()).toBeVisible();
            await expect(this.hamburgerCloseMenuButtonLocator()).toBeVisible();
            await this.hamburgerCloseMenuButtonLocator().click();
            await expect(this.hamburgerMenu()).not.toBeVisible();
            logger.info("Hamburger menu close validated successfully");
        }
        catch (error) {
            logger.error(`Hamburger menu close validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Hamburger Menu About Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuAboutNavigationValidation() {
        try {
            await expect(this.hamburgerAboutButtonLocator()).toBeVisible();
            await this.hamburgerAboutButtonLocator().click();
            await expect(this.page).toHaveURL("https://saucelabs.com/");
            logger.info("Hamburger menu about navigation validated successfully");
        }
        catch (error) {
            logger.error(`Hamburger menu about navigation validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Hamburger Menu Logout Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuLogoutNavigationValidation() {
        try {
            await expect(this.hamburgerLogoutButtonLocator()).toBeVisible();
            await this.hamburgerLogoutButtonLocator().click();
            await expect(this.page).toHaveURL(process.env.BASE_URL || "");
            logger.info("Hamburger menu logout navigation validated successfully");
        }
        catch (error) {
            logger.error(`Hamburger menu logout navigation validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Hamburger Menu All Items Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuAllItemsNavigationValidation() {
        try {
            await expect(this.hamburgerAllItemsButtonLocator()).toBeVisible();
            await this.hamburgerAllItemsButtonLocator().click();
            await expect(this.page).toHaveURL(process.env.BASE_URL || "");
            logger.info("Hamburger menu all items navigation validated successfully");
        }
        catch (error) {
            logger.error(`Hamburger menu all items navigation validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Count equal to 6
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemCountValidate() {
        try {
            await expect(this.itemImageLocator()).toHaveCount(6);
            await expect(this.itemLabelLocator()).toHaveCount(6);
            await expect(this.itemPriceBarLocator()).toHaveCount(6);
            logger.info("Home page item count validated successfully");
        }
        catch (error) {
            logger.error(`Home page item count validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Filter
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterValidate() {
        try {
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            await expect(this.filterOptionAZLocator()).toBeAttached();
            await expect(this.filterOptionZALocator()).toBeAttached();
            await expect(this.filterOptionLowToHighLocator()).toBeAttached();
            await expect(this.filterOptionHighToLowLocator()).toBeAttached();
            logger.info("Home page item filter validated successfully");
        }
        catch (error) {
            logger.error(`Home page item filter validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate all product details sequentially from 0th to 5th position
     * @param expectedItems Array of expected item objects
     */
    async validateAllProductDetailsSequentially(expectedItems: { position: number, name: string, description: string, price: string }[]) {
        try {
            for (let i = 0; i < expectedItems.length; i++) {
                const item = expectedItems[i];

                // Validate all variable values for this position
                await expect(this.itemNameLocator().nth(i)).toContainText(item.name);
                await expect(this.itemDescLocator().nth(i)).toHaveText(item.description);
                await expect(this.itemPriceLocator().nth(i)).toHaveText(item.price);

                logger.info(`Product details validated successfully at position ${i}: ${item.name}`);
            }
            logger.info("All 6 product sequences validated successfully from 0th to 5th position.");
        } catch (error) {
            logger.error(`Sequential product details validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate product details by navigating to each product's detail page sequentially
     * @param expectedItems Array of expected item objects
     */
    async validateProductDetailsByNavigationSequentially(expectedItems: { position: number, name: string, description: string, price: string }[]) {
        try {
            for (let i = 0; i < expectedItems.length; i++) {
                const item = expectedItems[i];
                await this.itemNameLocator().nth(i).click();

                // Validate details on the product details page
                await expect(this.itemNameLocator().first()).toContainText(item.name);
                await expect(this.itemDescLocator().first()).toHaveText(item.description);
                await expect(this.itemPriceLocator().first()).toHaveText(item.price);

                logger.info(`Product details validated successfully on details page for position ${i}: ${item.name}`);

                await this.page.goto(process.env.BASE_URL + "/inventory.html");
                await expect(this.itemNameLocator().first()).toBeVisible();
            }
            logger.info("Successfully validated all product details via detail page navigation.");
        } catch (error) {
            logger.error(`Navigation product details validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Filter Low to High
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     * @param expectedItemName the name of the expected first item
     */
    async homePageItemFilterLowToHighValidate(expectedItemName: string) {
        try {
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            await this.itemFilterButtonLocator().selectOption('lohi');
            await expect(this.itemNameLocator().nth(0)).toHaveText(expectedItemName);
            logger.info("Home page item filter low to high validated successfully");
        }
        catch (error) {
            logger.error(`Home page item filter low to high validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Filter High to Low
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     * @param expectedItemName the name of the expected first item
     */
    async homePageItemFilterHighToLowValidate(expectedItemName: string) {
        try {
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            await this.itemFilterButtonLocator().selectOption('hilo');
            await expect(this.itemNameLocator().nth(0)).toHaveText(expectedItemName);
            logger.info("Home page item filter high to low validated successfully");
        }
        catch (error) {
            logger.error(`Home page item filter high to low validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Filter A to Z
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     * @param expectedItemName the name of the expected first item
     */
    async homePageItemFilterAZValidate(expectedItemName: string) {
        try {
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            await this.itemFilterButtonLocator().selectOption('az');
            await expect(this.itemNameLocator().nth(0)).toHaveText(expectedItemName);
            logger.info("Home page item filter A to Z validated successfully");
        }
        catch (error) {
            logger.error(`Home page item filter A to Z validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Item Filter Z to A
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     * @param expectedItemName the name of the expected first item
     */
    async homePageItemFilterZALocate(expectedItemName: string) {
        try {
            await expect(this.itemFilterButtonLocator()).toBeVisible();
            await this.itemFilterButtonLocator().selectOption('za');
            await expect(this.itemNameLocator().nth(0)).toHaveText(expectedItemName);
            logger.info("Home page item filter Z to A validated successfully");
        }
        catch (error) {
            logger.error(`Home page item filter Z to A validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Footer Text
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterTextValidate() {
        try {
            await expect(this.footerTextLocator()).toBeVisible();
            logger.info("Home page footer text validated successfully");
        }
        catch (error) {
            logger.error(`Home page footer text validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Footer Social Media Links
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterSocialMediaLinksValidate() {
        try {
            await expect(this.footerFacebookIconLocator()).toBeVisible();
            await expect(this.footerTwitterIconLocator()).toBeVisible();
            await expect(this.footerLinkedInIconLocator()).toBeVisible();
            logger.info("Home page footer social media links validated successfully");
        }
        catch (error) {
            logger.error(`Home page footer social media links validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Footer Facebook Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterFacebookNavigationValidation() {
        try {
            await expect(this.footerFacebookIconLocator()).toBeVisible();
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.footerFacebookIconLocator().click()
            ]);

            await newPage.waitForLoadState();
            await expect(newPage).toHaveURL("https://www.facebook.com/saucelabs");
            logger.info("Home page footer facebook navigation validated successfully");
        }
        catch (error) {
            logger.error(`Home page footer facebook navigation validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Footer Twitter Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterTwitterNavigationValidation() {
        try {
            await expect(this.footerTwitterIconLocator()).toBeVisible();
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.footerTwitterIconLocator().click()
            ]);

            await newPage.waitForLoadState();
            await expect(newPage).toHaveURL("https://x.com/saucelabs");
            logger.info("Home page footer twitter navigation validated successfully");
        }
        catch (error) {
            logger.error(`Home page footer twitter navigation validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the Home Page Footer LinkedIn Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterLinkedInNavigationValidation() {
        try {
            await expect(this.footerLinkedInIconLocator()).toBeVisible();
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.footerLinkedInIconLocator().click()
            ]);

            await newPage.waitForLoadState();
            await expect(newPage).toHaveURL("https://www.linkedin.com/company/sauce-labs/");
            logger.info("Home page footer linkedin navigation validated successfully");
        }
        catch (error) {
            logger.error(`Home page footer linkedin navigation validation failed: ${error}`);
            throw error;
        }
    }
}