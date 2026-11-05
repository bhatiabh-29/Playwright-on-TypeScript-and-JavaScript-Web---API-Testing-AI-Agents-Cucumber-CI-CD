const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');


test("Popup Validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");
    await page.goBack();


    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();


    //Working with dialogs in playwright 
    //There are 2 methods either accept or dismiss it 
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();


    //Hover in playwright 
    await page.locator("#mousehover").hover();

    //handling frames 
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);



})