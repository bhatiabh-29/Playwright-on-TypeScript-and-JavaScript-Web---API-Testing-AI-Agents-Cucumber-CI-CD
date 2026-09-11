
import { expect, test } from '@playwright/test';


test('Login Success Test', async({page})=>{

    const cardTitles = page.locator('.card-body a');


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator('[type="password"]').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();

   // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());


    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);

});


test('Fetch Title', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('input#userEmail').fill("whoami@gmail.com");
    await page.locator('#userPassword').fill('Test@123456');
    await page.locator('[type="submit"]').click();
    //console.log(await page.locator('.card-body b').first().textContent());

    await page.waitForLoadState("networkidle");
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);


});