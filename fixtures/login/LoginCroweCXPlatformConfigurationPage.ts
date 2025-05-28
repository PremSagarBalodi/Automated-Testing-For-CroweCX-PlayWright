import { test as basetest, expect} from '@playwright/test';
import { LoginCroweCXPlatformConfigurationPage } from '../../pages/apps/Apps/login_croweCX_platform_configuration';

type fixtures = {
    login: LoginCroweCXPlatformConfigurationPage;
};

export const test = basetest.extend<fixtures>({
    login: async ({ page }, use) => {
        const login = new LoginCroweCXPlatformConfigurationPage(page);
        // Perform login actions
            await use(login);
        }
    });