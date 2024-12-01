import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

// This test is likely to fail if the particles render correctly.
test('Home Screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot();
});
