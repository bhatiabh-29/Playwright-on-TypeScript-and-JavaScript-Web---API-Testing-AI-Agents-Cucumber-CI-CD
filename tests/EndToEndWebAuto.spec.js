import { expect, test } from "@playwright/test";
import { text } from "node:stream/consumers";

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

test.only("Login with new user", async ({ page }) => {
  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";
  const cvvCode = page.locator('.field.small:has-text("CVV Code") input');
  const nameOnCard = page.locator('div.row:has-text("Name on Card ") input');
  const ccNum = page.locator("div.row:has-text('Credit Card Number ') input");
  const exDate = page.locator("select.input.ddl");
  const options = page.locator(".ta-results");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("whoami@gmail.com");
  await page.locator("#userPassword").fill("Test@123456");
  await page.locator("#login").click();

  //wait for the page to load completely
  await page.waitForLoadState("networkidle");
  //waiting for the cards to load
  await page.locator(".card-body b").first().waitFor();

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator('text=" Add To Cart"').click();
      break;
    }
  }
  await page.locator('[routerlink*="/cart"]').click();

  await page.locator("div li").first().waitFor();

  const bool = page.locator('h3:has-text("iphone 13 pro")').isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();

  await ccNum.nth(0).clear();
  await ccNum.nth(0).fill('0000 0000 0000 0000');

  await exDate.first().selectOption('05');
  await expect(exDate.first()).toHaveValue('05');
  await exDate.last().selectOption('31');
  await expect(exDate.last()).toHaveValue('31');

  await cvvCode.fill("123");
  await expect(cvvCode).toHaveValue("123");

  await nameOnCard.nth(2).fill('test');
  await expect((nameOnCard).nth(2)).toHaveValue('test');

  await page.locator("[placeholder='Select Country']").pressSequentially('ind', {delay: 100} );
  await options.waitFor();
  const optionCount = await options.locator("button").count();
  for (let i=0; i <=optionCount; i++){
    const text = await (options.locator("button").nth(i).textContent());
    if (text === ' India' ){
      await options.locator("button").nth(i).click();
      break;
    }
  }
  



  await page.pause();
});

/*test("Add to cart amazon", async ({ page }) => {
  const products = page.locator(
    '[data-component-type="s-search-result"]',
  );
  const productName = "AirPods Pro";

  await page.goto(
    "https://www.amazon.com/s?k=apple&crid=3AXZSGYZCM23U&sprefix=apple%2Caps%2C284&ref=nb_sb_noss_1",
  );
  await page.waitForLoadState("domcontentloaded");

  const counts = await products.count();
  for (let i = 0; i < counts; i++) {
    const product = products.nth(i);
    const title = product.locator("h2 span");
    if ((await title.count()) > 0 && (await title.first().innerText()).includes(productName)) {
      const addToCart = product.getByRole("button", { name: /add to cart/i });
      if ((await addToCart.count()) > 0) {
        await addToCart.first().click();
      }
      break;
    }
  }

  await page.pause();
}); */
