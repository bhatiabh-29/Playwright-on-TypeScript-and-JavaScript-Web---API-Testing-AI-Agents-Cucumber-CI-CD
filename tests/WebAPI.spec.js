import { test, expect, request } from "@playwright/test";
const { APIUtils } = require("./Utils/APIUtils");

const loginPayload = {
  userEmail: "whoami@gmail.com",
  userPassword: "Test@123456",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Verify API-created order in My Orders", async ({ page }) => {
  // token must be set BEFORE goto
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  // dashboard nav button (not the thank-you page link)
  await page.getByRole("button", { name: /ORDERS/i }).click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();
    if (rowOrderId === response.orderId) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = (await page.locator(".col-text").textContent()).trim();
  expect(orderIdDetails).toBe(response.orderId);
});
