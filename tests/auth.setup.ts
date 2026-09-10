import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in with Microsoft' }).click();
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' })
    .fill(process.env.HVMS_USERNAME!);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: /Enter the password/ })
    .fill(process.env.HVMS_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('div').filter({ hasText: /^Home$/ })).toBeVisible();

  // Session state එක file එකකට save කරනවා - repeat login ඕන නෑ
  await page.context().storageState({ path: authFile });
});