import { expect } from '@playwright/test';
import { test as croweTest } from '../../fixtures/login/LoginCroweCX';
import { test as financialTest } from '../../fixtures/Login/LoginCroweCXFinancialPage';
import { test as commercialTest } from '../../fixtures/Login/LoginCroweCXCommercialPage';
import { test as configurationTest } from '../../fixtures/Login/LoginCroweCXPlatformConfigurationPage';

// Crowe CX Unified Suite
croweTest.describe('Crowe Commercial Login', () => {
    croweTest('should login successfully with valid credentials', async ({ page, login }) => {
        await login.login(process.env.authenticationUsernameUser, process.env.authenticationPasswordUser);
        await expect(page).toHaveURL(/.*dashboard|main\.aspx/);
        await expect(page.locator('span[data-id="appBreadCrumbText"]:has-text("Crowe CX")')).toBeVisible();
    });
});

// Crowe Financial Spreading Suite
financialTest.describe('Crowe Financial Login', () => {
    financialTest('should login successfully with valid credentials', async ({ page, login }) => {
        await login.login(process.env.authenticationUsernameUser, process.env.authenticationPasswordUser);
        await expect(page).toHaveURL(/.*dashboard|main\.aspx/);
        await expect(page.locator('span[data-id="appBreadCrumbText"]:has-text("Crowe CX for Financial Spreading")')).toBeVisible();
    });
});

// Crowe Commercial Lending Suite
commercialTest.describe('Crowe Commercial Spreading Login', () => {
    commercialTest('should login successfully with valid credentials', async ({ page, login }) => {
        await login.login(process.env.authenticationUsernameUser, process.env.authenticationPasswordUser);
        await expect(page).toHaveURL(/.*dashboard|main\.aspx/);
        await expect(page.locator('span[data-id="appBreadCrumbText"]:has-text("Crowe CX for Financial Spreading")')).toBeVisible();
    });
});

// Crowe Platform Configuration Suite
configurationTest.describe('Crowe Platform Configuration Login', () => {
    configurationTest('should login successfully with valid credentials', async ({ page, login }) => {
        await login.login(process.env.authenticationUsernameUser, process.env.authenticationPasswordUser);
        await expect(page).toHaveURL(/.*dashboard|main\.aspx/);
        await expect(page.locator('span[data-id="appBreadCrumbText"]:has-text("Crowe CX for Financial Spreading")')).toBeVisible();
    });
});