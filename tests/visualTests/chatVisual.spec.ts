import { test, expect } from '@playwright/test';

test('Chat Screenshot', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState("load")
    await expect(page).toHaveScreenshot();
});

test('Chat Screenshot w/ Sidebar', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState("load")
    const sidebar = await page.getByTestId("sidebar").first()
    await sidebar.hover()
    await expect(page).toHaveScreenshot();
});
