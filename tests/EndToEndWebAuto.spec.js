import { expect, test } from "@playwright/test";

test("Register User", async ({ page }) => {
  const userEmail = page.locator("#userEmail");
  const userPass = page.locator("#userPassword");
  const email = `test${Date.now()}@gmail.com`;

  //Goto to the url
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("p.login-wrapper-footer-text").click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/auth/register",
  );

  //fill the form to register new user
  await page.locator("#firstName").fill("Bhavin");
  await page.locator("#lastName").fill("Bhatia");
  await userEmail.fill(email);
  await expect(userEmail).toHaveValue(email);
  await page.locator("#userMobile").fill("1122334455");
  await page.locator('[formcontrolname="occupation"]').selectOption("Engineer");
  await page.locator('[value="Male"]').check();
  await expect(page.locator('[value="Male"]')).toBeChecked();
  await userPass.fill("Test@123456");
  await page.locator("#confirmPassword").fill("Test@123456");
  await page.locator('[type="checkbox"]').check();
  await expect(page.locator('[type="checkbox"]')).toBeChecked();
  await page.locator("#login").click();
  await expect(page.locator("h1.headcolor")).toHaveText(
    "Account Created Successfully",
  );
  console.log(await page.locator("h1.headcolor").textContent());
  await page.locator('text="Login"').click();

  await page.pause();
});

test('Login with new user', async({page}) =>{

    const products = page.locator(".card-body");
    const productName = 'iphone 13 pro';
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("whoami@gmail.com");
    await page.locator('#userPassword').fill('Test@123456');
    await page.locator('#login').click();

    //wait for the page to load completely
    await page.waitForLoadState('networkidle');

    const count = await products.count();
    for(let i=0; i<=count; ++i){
      if (await products.nth(i).locator("b").textContent() === productName)
      {
        await products.nth(i).locator('text=" Add To Cart"').click();
        break;
      }

    }
    await page.pause();
    
    
});
