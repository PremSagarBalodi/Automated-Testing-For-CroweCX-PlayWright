import { test, expect } from '@playwright/test';
import { login } from './login_croweCX.js';
//import { TIMEOUT } from 'dns';

test('Create a Consolidated Statement', async ({ page }) => {

  await login(page);
  await page.goto('https://crowecommbankingplatform-qa.crm.dynamics.com/main.aspx?forceUCI=1&pagetype=apps');
  await page.locator('iframe[title="AppLandingPage"]').contentFrame().getByLabel('Crowe CX for Financial').click();
  await page.getByText('Spreads').click();
  await page.locator("//input[@placeholder='Filter by keyword']").fill("Statements");
  await page.keyboard.press('Enter');
  await page.locator("//span[normalize-space()='Statements Consolidated Into Test Spread']").click();
  await page.waitForLoadState('load');
  const consolidate_button = "//button[@title='Consolidate Statements']";
  await page.locator(consolidate_button).click();

  const selectstatements = "//div[@role='alertdialog']//div//div//div//div//div/button/span";
  (await page.waitForSelector(selectstatements)).click();
  const checkbox1 = "//body/div[@dir='ltr']/div[@role='menu']/div[1][1]/span[1]//*[name()='svg']";
  await page.locator(checkbox1).click();
  (await page.waitForSelector(selectstatements)).click();
  //const checkbox2 = "//body[1]/div[12]/div[1]/div[2][2]/span[1]";
  //await page.locator(checkbox2).click();
  await page.locator("//div[@role='alertdialog']//div[2]//span[2]//select[1]").click();
  await page.locator("//div[@role='alertdialog']//div[2]//span[2]//select[1]//optgroup//option[text()='Acme Company']")
});