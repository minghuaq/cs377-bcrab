import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('http://localhost:3000/api/auth/signin?callbackUrl=%2Fchat');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Name').fill('Test User');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

    await page.context().storageState({ path: authFile });
});
