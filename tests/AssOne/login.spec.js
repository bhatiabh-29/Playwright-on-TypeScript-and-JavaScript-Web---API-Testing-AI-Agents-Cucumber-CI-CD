import { test, expect } from "@playwright/test";
import fs from "fs";


async function login(page) {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill("youtoo@gmail.com");
  await page.getByLabel("Password").fill("Test@12345");
  await page.locator("#login-btn").click();
  await expect(page.locator("div h2").first()).toBeVisible("Featured Events");
}
// define the helper function to return a formatted date string
function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 7); //Moves the date 7 days into the future
  return date.toISOString().slice(0, 16);
}

test("full booking flow", async ({ page }) => {
  const uniqueEventTitle = `Test Event ${Date.now()}`;

  await login(page);
  await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
  await page.locator("#event-title-input").fill(uniqueEventTitle);
  await page.locator("#admin-event-form textarea").fill("Test");
  await page.getByLabel("City*").fill("Mumbai");
  await page.getByLabel("Venue*").fill("Test, Apt 123, 02130");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  await expect(page.getByText("✓Event created!×")).toBeVisible();
  fs.writeFileSync("Event-Titles.txt", uniqueEventTitle);
  await page.pause();
});

test("Find the event card and capture seats", async ({ page }) => {

  const uniqueEventTitle = fs.readFileSync("Event-Titles.txt", "utf-8");
  await login(page);
  await page.goto("https://eventhub.rahulshettyacademy.com/events");
  await page.waitForLoadState("networkidle");
  
  //print title for all the event cards
  const eventCards = page.locator('[data-testid="event-card"]');
  const eventCardsTitles = page.locator('[data-testid="event-card"] h3');
  const allCards = await eventCardsTitles.allTextContents();
  await expect(eventCardsTitles.first()).toBeVisible();
  console.log(allCards);

  
  const matchingCard = eventCards.filter({ hasText: uniqueEventTitle });
  await expect(matchingCard).toHaveCount(1);
  console.log(await matchingCard.textContent());
  
  const seatsBeforeBooking = await matchingCard.getByText("seats available").textContent();
  const seats = parseInt(seatsBeforeBooking.match(/\d+/)[0], 10);
  console.log("Seats before booking:", seats);
  await matchingCard.getByTestId("book-now-btn").click();
  await page.pause();
  

  //- On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)




  
});


/*Step 5 — Fill booking form

- Assert: element with id #ticket-count has text 1 (default quantity)

- Fill Full Name (locate by label Full Name)

- Fill Email (locate by id #customer-email)

- Fill Phone (locate by placeholder +91 98765 43210)

- Click the confirm button (locate by CSS class .confirm-booking-btn)*/




