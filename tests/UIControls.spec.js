import { expect, test } from '@playwright/test';


test.only('UIControl test', async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');

    const radioBtn = page.locator('.radiotextsty')
    await radioBtn.nth(1).click();
    await page.locator('#okayBtn').click();
    console.log(await radioBtn.nth(1).isChecked());


    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');

    await expect(radioBtn.last()).toBeChecked();

    const terms = page.locator('input#terms')
    await terms.click();
    expect(await terms).toBeChecked();
    

    await terms.uncheck();
    expect (await terms.isChecked()).toBeFalsy();

    await page.locator('#signInBtn').click();

});