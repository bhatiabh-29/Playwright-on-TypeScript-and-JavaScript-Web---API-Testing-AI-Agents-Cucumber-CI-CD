import { test, expect, request } from "@playwright/test";
const { APIUtils } = require("./Utils/APIUtils");
const loginPayload = {
  userEmail: "whoami@gmail.com",
  userPassword: "Test@123456",
};
const orderPayLoad = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "6960eae1c941646b7a8b3ed3",
    },
  ],
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Place and order ", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.logintoken);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.waitForLoadState("networkidle");

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
