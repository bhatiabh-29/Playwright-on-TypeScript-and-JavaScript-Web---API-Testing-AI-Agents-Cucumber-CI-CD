import { test, expect } from "@playwright/test";

test("Login with new user", async ({ page }) => {
  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";
  const cvvCode = page.locator(".field.small input").first();
  const nameOnCard = page.locator('div.row').getByRole('textbox').nth(2);
  const ccNum = page.locator("div.row").filter({ hasText: "Credit Card Number " }).getByRole("textbox");
  //const ccNum = page.locator("div.row:has-text('Credit Card Number ') input");
  const exDate = page.locator("select.input.ddl");
  const options = page.locator(".ta-results");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill("whoami@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@123456");
  await page.getByRole("button", { name: "Login" }).click();

  //wait for the page to load completely
  await page.waitForLoadState("networkidle");
  //waiting for the cards to load
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  await page.getByRole("listitem").getByRole("button", {name:'Cart'}).click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  await page.getByText("Checkout").click();
  await ccNum.nth(0).fill("0000 0000 0000 0000");

  await exDate.first().selectOption("05");
  await expect(exDate.first()).toHaveValue("05");
  await exDate.last().selectOption("31");
  await expect(exDate.last()).toHaveValue("31");

  await cvvCode.fill("123");
  await expect(cvvCode).toHaveValue("123");

  await nameOnCard.fill("test");
  await expect(nameOnCard).toHaveValue("test");
  await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay: 100});
  await page.getByRole("button", {name:"India"}).nth(1).click();
  await expect(page.locator(".user__name input").first()).toHaveValue("whoami@gmail.com");
  await page.getByText('Place Order ').click();


  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const orderId = (
    await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  )
    .trim()
    .replace(/\|/g, "")
    .trim();
  console.log(orderId);

  await page.locator('.em-spacer-1 [routerlink="/dashboard/myorders"]').click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
