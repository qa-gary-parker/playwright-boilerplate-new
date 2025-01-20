import { test, expect, request } from '@playwright/test';

test.describe('API Testing Suite', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });
  });

  test('GET request - Fetch a post', async () => {
    const response = await apiContext.get('/posts/1');
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
  });

  test('POST request - Create a new post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const response = await apiContext.post('/posts', {
      data: newPost,
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toMatchObject(newPost);
    expect(responseBody).toHaveProperty('id');
  });

  test('PUT request - Update a post', async () => {
    const updatedPost = {
      id: 1,
      title: 'updated title',
      body: 'updated body',
      userId: 1,
    };

    const response = await apiContext.put('/posts/1', {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(updatedPost);
  });

  test('PATCH request - Modify a post', async () => {
    const postUpdates = {
      title: 'patched title',
    };

    const response = await apiContext.patch('/posts/1', {
      data: postUpdates,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('title', 'patched title');
  });

  test('DELETE request - Remove a post', async () => {
    const response = await apiContext.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

  test.afterAll(async () => {
    // Dispose of the API context after tests
    await apiContext.dispose();
  });
});
