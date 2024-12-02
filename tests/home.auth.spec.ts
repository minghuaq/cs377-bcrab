import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

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

test('Home does have chat button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await expect(button).toBeVisible()
});

test('Home does have sign out button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByText('Sign Out').first()
    await expect(button).toBeVisible()
});

test('Home doe not have sign-in button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Sign in' })).not.toBeVisible();
});

test('Chat navigates to chats', async ({ page, baseURL }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await button.click()
    await page.waitForURL("/chat")

    await expect(page.url()).toBe(baseURL + "/chat")
});
