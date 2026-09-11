import {test, expect} from '@playwright/test';


test('Browser Context Playwright Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

});

test('Page playwright test', async({page})=>{

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});




test('browser context playwright test1', async({browser})=>{

   const context =await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   await page.locator('input#username').fill('rahulshetty');
   
});