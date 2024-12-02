import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Chat redirects to sign in', async ({ page, baseURL }) => {
    await page.goto('/chat');

    await page.waitForURL("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F", { timeout: 1000 })

    await expect(page.url()).toBe(baseURL + "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F")
});