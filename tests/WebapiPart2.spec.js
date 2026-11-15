//login once - collect all the login information to strorage state and
//save the content in json file

const { test, expect } = require("@playwright/test");
let webContext;
const path = require("node:path");

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill("whoami@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@123456");
  await page.getByRole("button", { name: "Login" }).click();

  //wait for the page to load completely
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Login with new user", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  //wait for the page to load completely
  await page.waitForLoadState("networkidle");
  //waiting for the cards to load
  await page.locator(".card-body b").first().waitFor();

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
});
