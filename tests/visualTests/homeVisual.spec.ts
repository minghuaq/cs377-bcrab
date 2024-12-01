import { test, expect } from '@playwright/test';

// This test is likely to fail if the particles render correctly.
test('Home Screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot();
});
