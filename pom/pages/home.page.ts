import { Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class homePage {
    readonly page: Page;
    readonly url: string;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.url = process.env.URLTODO ?? "";
        this.loginBtn = page.getByRole('link', { name: 'Log in' });
    }

    async goto(){
        await this.page.goto(this.url);
    };
}