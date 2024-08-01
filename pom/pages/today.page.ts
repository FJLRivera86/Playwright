import { Page, Locator } from '@playwright/test';

export class todayPage {
    readonly page: Page;
    readonly titleLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.titleLabel = page.getByRole('heading', { name: 'Today' }).first();        
    }
}