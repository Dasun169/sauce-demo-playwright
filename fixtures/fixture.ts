import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';


type Fixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
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
    }
});

export const test = testPages;
export { expect };