import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutComplete } from '../src/pages/CheckoutPage';


type Fixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutComplete: CheckoutComplete;
    userName: string;
    password: string;
    baseUrl: string;
};

const testPages = base.extend<Fixtures>({
    baseUrl: async ({ }, use) => {
        await use(process.env.BASE_URL || "");
    },

    userName: async ({ }, use) => {
        await use(process.env.TEMPUSERNAME || "");
    },

    password: async ({ }, use) => {
        await use(process.env.PASSWORD || "");
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await use(checkoutStepOnePage);
    },

    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await use(checkoutStepTwoPage);
    },

    checkoutComplete: async ({ page }, use) => {
        const checkoutComplete = new CheckoutComplete(page);
        await use(checkoutComplete);
    }
});

export const test = testPages;
export { expect };