import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });
test.use({ storageState: { cookies: [], origins: [] } });

test('Home has logo', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('bcrab-logo')).toBeVisible();
});

test('Home has sparkles', async ({ page }) => {
    await page.goto('/');

    const sparkles = await page.getByTestId("sparkles").first()
    await expect(sparkles).toBeVisible
});

test('Home has title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('title')).toBeVisible();
});

test('Home does not have chat button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await expect(button).not.toBeDefined()

    // const buttonRole = await page.getByRole("link").first()
    // await expect(buttonRole).toBe(buttonRole)
});

test('Home has sign-in button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

// test('Chat button navigates to chat', async ({ page, baseURL }) => {
//     await page.goto('/');

//     const button = await page.getByTestId("chat-button").first()
//     await button.click()
//     await page.waitForURL("**/chat")

//     await expect(page.url()).toBe(baseURL + "/chat")
// });
