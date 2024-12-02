import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Chat redirects to sign in', async ({ page, baseURL }) => {
    await page.goto('/api/chat/');

    await page.waitForURL("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F", { timeout: 1000 })

    await expect(page.url()).toBe(baseURL + "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F")
});

test('Chat History redirects to sign in', async ({ page, baseURL }) => {
    await page.goto('/api/chat/history/list');

    await page.waitForURL("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F", { timeout: 1000 })

    await expect(page.url()).toBe(baseURL + "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F")
});

test('Chat [id] redirects to sign in', async ({ page, baseURL }) => {
    await page.goto('/api/chat/00000000-0000-0000-000000000000');

    await page.waitForURL("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F", { timeout: 1000 })

    await expect(page.url()).toBe(baseURL + "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F")
});

test('Dev API is responding', async ({ request }) => {
    const req = await request.post(`/api/dev/create-user`, {
        data: {
            user: {
                email: "test@example.com"
            }
        }
    });
    expect(req.ok()).toBeTruthy();
});
