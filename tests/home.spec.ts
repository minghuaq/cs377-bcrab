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

test('Home does not have chat button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await expect(button).not.toBeVisible()
});

test('Home does not have sign out button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByText('Sign Out').first()
    await expect(button).not.toBeVisible()
});

test('Home has sign-in button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('Sign in navigates to login page', async ({ page, baseURL }) => {
    await page.goto('/');

    const button = await page.getByText('Sign In').first()
    await button.click()
    await page.waitForURL("/api/auth/signin?callbackUrl=%2Fchat")

    await expect(page.url()).toBe(baseURL + "/api/auth/signin?callbackUrl=%2Fchat")
});
