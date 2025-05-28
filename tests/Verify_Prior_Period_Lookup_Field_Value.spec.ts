import { test, expect } from '@playwright/test';
import { login } from './login_croweCX.ts';
import { createStatement } from './createStatement.ts';
import { createPriorPeriodStatement } from './createPriorPeriodStatement.ts';

test('Navigate to Statements entity to create a new Statement', async ({ page,request }) => {

  const CreatePriorPeriodStatement = await createPriorPeriodStatement(request);
  const CreateStatement = await createStatement(request);

  await login(page);
  await page.locator("//span[normalize-space()='Statements']").click({ timeout: 8000 });
  await page.locator("//input[@placeholder='Filter by keyword']").fill("Crowe LLP");
  await page.keyboard.press('Enter');
  await page.locator("//span[@role='presentation'][normalize-space()='Crowe LLP - 2024 - April']").click({ timeout: 10000 });
  await page.waitForLoadState();
  const Finalize = "//button[@aria-label='Finalize']";
  await page.waitForSelector(Finalize, { timeout: 50000 });
  await page.locator(Finalize).click();
  await page.waitForLoadState();

  await page.locator("//button[@title='Go back']//span").click({ timeout: 3000 });

  await page.locator("//input[@placeholder='Filter by keyword']").fill("Crowe LLP");
  await page.keyboard.press('Enter');
  await page.locator("//span[@role='presentation'][normalize-space()='Crowe LLP - 2025 - April']").click({ timeout: 10000 });
  await page.waitForLoadState();
  await page.locator(Finalize).click();
  await page.waitForLoadState();

  await page.locator("//li[@title='Admin.']").click({ timeout: 3000 });

  const PriorPeriodLookup = ("//div[@data-id='crowe_previousyearendlookup.fieldControl-LookupResultsDropdown_crowe_previousyearendlookup_selected_tag_text");
  await page.waitForSelector(PriorPeriodLookup);

  const title = await page.getAttribute(PriorPeriodLookup, 'title');
  console.log('Title of the field:', title);

  expect(title).toBe('Crowe LLP - 2024 - April');

});