
import { expect, test } from '@playwright/test';


test('Login Error Message Test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('input#username').fill('BhavinBhatia');
    await page.locator('[type="password"]').fill('admin')
    await page.locator('input#signInBtn').click();

    const ErrorMsgLocator = page.locator('[style="display: block;"]');
    console.log(await ErrorMsgLocator.textContent());
    await expect(ErrorMsgLocator).toContainText("Incorrect");



});


