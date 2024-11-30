import { test, expect } from '@playwright/test';

test('Home Screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState("load")
    await expect(page).toHaveScreenshot();
});
