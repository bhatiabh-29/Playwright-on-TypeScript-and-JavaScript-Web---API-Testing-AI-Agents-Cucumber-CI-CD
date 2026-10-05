import {test,expect} from '@playwright/test';


test ('Playwright Unique GetByLocators', async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    await page.locator(".form-group input[name='name']").first().fill('test');
    await page.locator(".form-group input[name='email']").fill('test');
    await page.getByPlaceholder('Password').fill('test123')
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").click();
    await page.getByRole("button", {name: 'Submit'}).click();
    
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    //5 seconds default timeout for the expect assertions 
    //override and increase the time by overriding it in Timeout -- Step level
    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout: 10_0000});
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

})

test ('Timeouts class level', async({page}) =>{

    //!set the test level timeout for actions
    page.setDefaultTimeout(9000);
    //!test timeout 
    test.timeout({timeout: 60000});
    //!override and increase the time by overriding it in Timeout -- class level
    const slowExpect = expect.configure({timeout: 10000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    await page.locator(".form-group input[name='name']").first().fill('test');
    await page.locator(".form-group input[name='email']").fill('test');
    await page.getByPlaceholder('Password').fill('test123')
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").click();
    await page.getByRole("button", {name: 'Submit'}).click();
    
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    //!5 seconds default timeout for the expect assertions 
  
    await slowExpect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();
    //!Step level timeout for actions
    await page.getByRole("link", {name: 'Shop'}).click({timeout: 15000});

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

})