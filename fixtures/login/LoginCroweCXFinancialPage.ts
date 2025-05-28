import { test as basetest, expect} from '@playwright/test';
import { LoginCroweCXFinancialSpreadingPage } from '../../pages/apps/Apps/login_croweCX_financial_spreading';

type fixtures = {
    login: LoginCroweCXFinancialSpreadingPage;
};

export const test = basetest.extend<fixtures>({
    login: async ({ page }, use) => {
        const login = new LoginCroweCXFinancialSpreadingPage(page);
        // Perform login actions
            await use(login);
        }
    });