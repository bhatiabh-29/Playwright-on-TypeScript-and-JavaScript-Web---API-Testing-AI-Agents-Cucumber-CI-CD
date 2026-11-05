import { expect, test } from "@playwright/test";
require("dotenv").config();

async function login(page) {
  await page.goto(process.env.EVENTHUB_BASE_URL);
  await page.getByLabel("Email").fill(process.env.EVENTHUB_USER_EMAIL);
  await page.getByLabel("Password").fill(process.env.EVENTHUB_PASSWORD);
  await page.locator("#login-btn").click();
  await expect(page.locator("div h2").first()).toBeVisible("Featured Events");
  await page.getByRole("button", {name: 'My Bookings'}).click();
}

test("eligible for refund", async ({ page }) => {
  await login(page);
  console.log("test ok");
});
