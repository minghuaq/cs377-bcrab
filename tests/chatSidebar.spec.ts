import { test, expect } from '@playwright/test';

// TODO: Auth checks

test('Chat has Sidebar', async ({ page }) => {
    await page.goto('/chat');

    // Wait for sidebars initial animation
    await page.waitForTimeout(1000)

    const sidebar = await page.getByTestId("sidebar").first()
    await expect(sidebar).toBeVisible()

    const sidebarLinks = await page.getByTestId("sidebar-link-label").all()

    for (const link of await sidebarLinks){
        await expect(link).not.toBeVisible()
    }

    await sidebar.hover()

    // Wait for sidebars animation
    await page.waitForTimeout(1000)

    for (const link of await sidebarLinks){
        await expect(link).toBeVisible()
    }
});
