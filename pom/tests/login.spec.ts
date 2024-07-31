import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/login.page';
import { homePage } from '../pages/home.page';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.goto();
})

test('Successful Login for Todoist', async ({ page }) => {
    const login = new loginPage(page);
    const home = new homePage(page);
    dotenv.config();

    await login.startLoginBtn.click();
    await login.emailField.fill(process.env.EMAILTODO ?? '');
    await login.passwordField.fill(process.env.PASSTODO ?? '');
    await login.loginBtn.click();
    await expect(home.titleLabel).toBeVisible();
})