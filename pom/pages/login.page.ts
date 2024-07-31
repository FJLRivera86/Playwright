import { Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class loginPage {
    readonly page: Page;
    readonly url: string;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly startLoginBtn: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.url = process.env.URLTODO ?? "";
        this.emailField = page.getByPlaceholder('Enter your email...');
        this.passwordField = page.locator('Enter your password...');
        this.startLoginBtn = page.getByTestId('log-in-button');
        this.loginBtn = page.getByTestId('start-email-login');
    }

    async goto(){
        await this.page.goto(this.url);
    };
}