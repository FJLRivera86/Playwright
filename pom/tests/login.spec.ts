import { test, expect } from '@playwright/test';
import { homePage } from '../pages/home.page';
import { loginPage } from '../pages/login.page';
import { todayPage } from '../pages/today.page';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
    const home = new homePage(page);
    await home.goto();
    await home.loginBtn.click();
})

test.describe('Login to Todoist - By Email and Pasword', () => {
    test('Successful Login', async ({ page }) => {
        const login = new loginPage(page);
        const today = new todayPage(page);
        dotenv.config();
    
        await login.emailField.fill(process.env.EMAILTODO ?? '');
        await login.passwordField.fill(process.env.PASSTODO ?? '');
        await login.loginBtn.click();
        await expect(today.titleLabel).toBeVisible();
    });
    
    test('Required Fields', async ({ page }) => {
        const login = new loginPage(page);
        dotenv.config();
    
        await login.loginBtn.click();
        await expect(login.passwordField).toHaveAttribute('aria-invalid',"true");
        await login.passwordField.fill(process.env.PASSTODO ?? '');
        await login.loginBtn.click();
        await expect(login.validEmailLabel).toBeVisible();
        await login.emailField.fill(process.env.EMAILTODO ?? '');
        await expect(login.validEmailLabel).not.toBeVisible();
    });
    
    test.skip('Validation of Correct Data', async ({ page }) => {
        const login = new loginPage(page);
        dotenv.config();
    
        await login.loginBtn.click();
        await expect(login.passwordField).toHaveAttribute('aria-invalid',"true");
        await login.passwordField.fill('qwerty');
        await login.loginBtn.click();
        // Here I was to test the missing "@"" or an incomeplete email, 
        // but the "fastest" answer that I found for "@ missing" alert was on stackoverflow...
        // And I want to meet the rules... Maybe on weekend I can find the way to validate it.
        await login.passwordField.fill(process.env.PASSTODO ?? '');
        await login.emailField.fill('qwerty');
        // And the same for this step...
    });
});

