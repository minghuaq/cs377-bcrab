import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Chat has message box', async ({ page }) => {
    await page.goto('/chat');

    const input = await page.getByTestId("chat-input").first()
    await expect(input).toBeVisible()
    await expect(input).toBeEditable()
});

test('Chat has submit button', async ({ page }) => {
    await page.goto('/chat');

    const submit = await page.locator('#submitButton').first()
    await expect(submit).toBeVisible()
    await expect(submit).toHaveRole("button")
});

test('Can Enter Message', async ({ page }) => {
    await page.goto('/chat');

    const input = await page.getByTestId("chat-input").first()
    await input.fill("Test Text")
    await expect(input).toHaveText("Test Text")
});

test('Send Message w/ submit', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/chat/**', async route => {
        const body = await route.request().postDataJSON()

        await expect(body.message).toContain("Test Text")
        route.abort()
    });

    await page.route('*/**/api/chat/', async route => {
        route.abort()
    });

    await page.goto('/chat');

    page.waitForTimeout(500);

    const input = await page.getByTestId("chat-input").first()
    await input.fill("Test Text")
    const submit = await page.locator("#submitButton").first()
    await submit.click()
});

test('Send Message w/ enter', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/chat/**', async route => {
        const body = await route.request().postDataJSON()

        await expect(body.message).toContain("Test Text")
        route.abort()
    });

    await page.route('*/**/api/chat/', async route => {
        route.abort()
    });

    await page.goto('/chat');

    page.waitForTimeout(500);

    const input = await page.getByTestId("chat-input").first()
    await input.fill("Test Text")
    await input.press('Enter');
});

test('Send Message redirects', async ({ page, baseURL }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/chat/**', async route => {
        const json = {
            createMessage: {
                dialogId: "00000000-0000-0000-0000-000000000000",
                messageID: 0
            }
        }

        route.fulfill({ json })
    });

    await page.route('*/**/chat/00000000-0000-0000-0000-000000000000', async route => {
        route.fulfill({})
    });

    await page.goto('/chat');

    const input = await page.getByTestId("chat-input").first()
    const submit = await page.locator("#submitButton").first()
    await input.fill("Test Text")
    await submit.click()

    await page.waitForURL(baseURL + "/chat/00000000-0000-0000-0000-000000000000")
});

test('Send Message does not redirect on empty', async ({ page, baseURL }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/chat/**', async route => {
        const json = {
            createMessage: {
                dialogId: "00000000-0000-0000-0000-000000000000",
                messageID: 0
            }
        }

        route.fulfill({ json })
    });

    await page.route('*/**/chat/00000000-0000-0000-0000-000000000000', async route => {
        route.fulfill({})
    });

    await page.goto('/chat');

    const submit = await page.locator("#submitButton").first()
    await submit.click()

    await page.waitForTimeout(5000)

    await expect(page.url()).toBe(baseURL + "/chat")
});
