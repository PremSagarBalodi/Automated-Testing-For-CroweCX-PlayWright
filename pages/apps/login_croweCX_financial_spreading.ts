import { expect, Page } from '@playwright/test';
import ENV from "../../../utils/ENV";

export class LoginCroweCXFinancialSpreadingPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;

  }

 async login(username, password): Promise<void> {

    //Navigate to the login page
    await this.page.goto(ENV.applicationURL);

    //Enter the Username
    await this.page.fill('//input[@type="email"]', username||'');
    await this.page.click('//input[@value="Next"]');

    //Enter the password
    await this.page.fill('//input[@type="password"]', password||'');

    //Click Sign-In
    await this.page.click("//input[@value='Sign in']");
    await this.page.click("//input[@value='Yes']")
    await this.page.waitForTimeout(10000);
    const currenturl = this.page.url();

    expect(currenturl).toContain('apps');
    await this.page.waitForLoadState();
    await (await this.page.frameLocator('iframe[title="AppLandingPage"]')
      .getByTitle('Crowe CX for Financial Spreading').first()).click({ timeout: 60000 });
    await this.page.waitForLoadState();
    //await this.page.goto('https://crowecommbankingplatform-qa.crm.dynamics.com/main.aspx?appid=88e84b7c-fcd4-ef11-8eea-6045bd006f50&pagetype=dashboard&id=ee2ea995-cc40-ee11-bdf3-000d3a4f1588&type=system&_canOverride=true');
}}