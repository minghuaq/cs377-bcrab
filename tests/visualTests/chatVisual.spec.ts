import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

// TODO: Auth checks

test('Chat Screenshot', async ({ page }) => {
    await page.goto('/chat');

    // Wait for welcome text animation
    await page.waitForTimeout(5000);

    await expect(page).toHaveScreenshot();
});

test('Chat Screenshot w/ Sidebar', async ({ page }) => {
    await page.goto('/chat');

    // Wait for welcome text animation
    await page.waitForTimeout(5000);

    const sidebar = await page.getByTestId("sidebar").first()
    await sidebar.hover()

    // Wait for the sidebar appear animation
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot();
});
