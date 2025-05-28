import { test as basetest, expect} from '@playwright/test';
import { LoginCroweCXCommercialLendingPage } from '../../pages/apps/Apps/login_croweCX_commercial_lending';

type fixtures = {
    login: LoginCroweCXCommercialLendingPage;
};

export const test = basetest.extend<fixtures>({
    login: async ({ page }, use) => {
        const login = new LoginCroweCXCommercialLendingPage(page);
        // Perform login actions
            await use(login);
        }
    });