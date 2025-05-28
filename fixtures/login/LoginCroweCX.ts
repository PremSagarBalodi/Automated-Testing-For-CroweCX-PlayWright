import { test as basetest, expect} from '@playwright/test';
import { LoginCroweCXPage } from '../../pages/apps/login_croweCX';

type fixtures = {
    login: LoginCroweCXPage;
};

export const test = basetest.extend<fixtures>({
    login: async ({ page }, use) => {
        const login = new LoginCroweCXPage(page);
        // Perform login actions
            await use(login);
        }
    });
