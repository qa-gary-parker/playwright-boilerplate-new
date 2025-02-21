import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('faker generate test data', async ({ page }) => {
  const randomName = faker.person.fullName(); // e.g., 'John Doe'
  const randomEmail = faker.internet.email(); // e.g., 'john.doe@example.com'
  const randomPassword = faker.internet.password({ length: 10 }); // e.g., 'P@ssw0rd!9'
  const address = faker.string.alpha(20)

  console.log(randomName, randomEmail, randomPassword, address)
});
