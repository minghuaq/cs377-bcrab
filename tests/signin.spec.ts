import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Sign in page is accesible', async ({ page, baseURL }) => {
    await page.goto('/api/auth/signin');

    await expect(page.url()).toBe(baseURL + "/api/auth/signin")
});

test('Sign in page has all providers', async ({ page }) => {
    await page.goto('/api/auth/signin');

    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Discord' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Spotify' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Twitter' })).toBeVisible();
});

test('Sign in page has test credentials', async ({ page, baseURL }) => {
    await page.goto('/api/auth/signin');

    await page.goto('http://localhost:3000/api/auth/signin');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Credentials' })).toBeVisible();

    await page.goto('http://localhost:3000/api/auth/signin');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

    await expect(page.url()).toBe(baseURL+"/")
});