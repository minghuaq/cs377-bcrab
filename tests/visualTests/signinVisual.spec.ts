import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Chat Screenshot', async ({ page }) => {
    await page.goto('/api/auth/signin');

    await expect(page).toHaveScreenshot();
});
