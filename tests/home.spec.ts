import { test, expect } from '@playwright/test';

test('Home has logo', async ({ page }) => {
    await page.goto('/');

    const logo = await page.getByTestId("bcrab-logo").first()
    await expect(logo).toBeVisible()
});

test('Home has sparkles', async ({ page }) => {
    await page.goto('/');

    const sparkles = await page.getByTestId("sparkles").first()
    await expect(sparkles).toBeVisible
});

test('Home has title', async ({ page }) => {
    await page.goto('/');

    const title = await page.getByTestId("title").first()
    await expect(title).toBeVisible()
});

test('Home has chat button', async ({ page }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await expect(button).toBeVisible()

    const buttonRole = await page.getByRole("link").first()
    await expect(buttonRole).toBe(buttonRole)
});

test('Chat button navigates to chat', async ({ page, baseURL }) => {
    await page.goto('/');

    const button = await page.getByTestId("chat-button").first()
    await button.click()
    await page.waitForURL("**/chat")

    await expect(page.url()).toBe(baseURL + "/chat")
});
