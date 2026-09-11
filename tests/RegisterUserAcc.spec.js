import { expect, test } from "@playwright/test";


test('Register User Password Error', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".login-wrapper-footer-text a").click();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/register");

    await page.locator('input#firstName').fill("Bhavin");
    await page.locator('input#lastName').fill("Bhatia");
    await page.locator('input#userEmail').fill("test@gmail.com");

    await page.locator('#userMobile').fill('1234567891');
    await page.locator('[formcontrolname="occupation"]').selectOption('Student');
    await page.locator('[value="Male"]').click();
    await page.locator('#userPassword').fill('test123');
    await page.locator('#confirmPassword').fill('test123');
    await page.locator("[formcontrolname='required']").check();
    await page.locator("#login").click();

    //grab the password error
    const toast = page.locator('#toast-container');
    await expect(toast).toBeVisible();
    const message = await toast.textContent();
    console.log(message);

});

test('Register User Success', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".login-wrapper-footer-text a").click();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/register");

    await page.locator('input#firstName').fill("Bhavin");
    await page.locator('input#lastName').fill("Bhatia");
    await page.locator('input#userEmail').fill("whoami@gmail.com");

    await page.locator('#userMobile').fill('1234567891');
    await page.locator('[formcontrolname="occupation"]').selectOption('Student');
    await page.locator('[value="Male"]').click();
    await page.locator('#userPassword').fill('Test@123456');
    await page.locator('#confirmPassword').fill('Test@123456');
    await page.locator("[formcontrolname='required']").check();
    await page.locator("#login").click();
    const toast = page.locator('#toast-container');
    await expect(toast).toBeVisible();
    const message = await toast.textContent();
    console.log(message);
    await expect(page).textContent("Registered Successfully");
});


