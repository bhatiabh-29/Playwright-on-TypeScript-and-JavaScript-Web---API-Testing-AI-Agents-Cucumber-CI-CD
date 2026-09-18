import { test, expect } from "@playwright/test";

test("Child Windows And  Tabs Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const documentLink = page.locator('[href*="documents-request"]');

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //types of promise pending, rejected, fulfilled
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator("p.red").textContent();
  // console.log(text);
  const splitText = text.split("@");
  // console.log(splitText);
  const domain = splitText[1].split(" ")[0];
  // console.log(domain);

  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").inputValue());
});
