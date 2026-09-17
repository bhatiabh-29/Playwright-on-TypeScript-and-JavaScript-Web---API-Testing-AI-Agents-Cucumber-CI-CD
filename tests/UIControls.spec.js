import { expect, test } from "@playwright/test";

test("UIControl test", async ({ page }) => {
  const radioBtn = page.locator(".radiotextsty");
  const dropdown = page.locator("select.form-control");
  const terms = page.locator("input#terms");
  const documentsRequests = page.locator('[href*="documents-request"]');

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");

  await radioBtn.nth(1).click();
  await page.locator("#okayBtn").click();
  console.log(await radioBtn.nth(1).isChecked());

  await dropdown.selectOption("consult");
  await expect(radioBtn.last()).toBeChecked();

  await terms.click();
  await expect(terms).toBeChecked();

  await terms.uncheck();
  expect(await terms.isChecked()).toBeFalsy();

  await expect(documentsRequests).toHaveAttribute("class", "blinkingText");

  //await page.locator('#signInBtn').click();
});
