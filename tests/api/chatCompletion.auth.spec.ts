import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Chat completions run', async ({ request }) => {
    const req = await request.post(`/api/chat`, {
        data: {
            messagelist: [
                {
                    message: "Hello",
                    isAI: false
                },
            ]
        }
    });

    expect(req.ok()).toBeTruthy();

    const message = (await req.json()).product.choices[0].message.content

    expect(message).toBeTruthy()
});
