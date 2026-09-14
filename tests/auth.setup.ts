import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

// මුළු test එකටම extra time දෙනවා - MFA approval එකට manual action ඕන නිසා
setup.setTimeout(120_000); // 2 minutes

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in with Microsoft' }).click();
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' })
    .fill(process.env.HVMS_USERNAME!);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: /Enter the password/ })
    .fill(process.env.HVMS_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // MFA number matching screen එක load වෙනකන් wait කරනවා
  console.log('📱 Authenticator app එකේ number එක approve කරන්න...');

  // "Yes" button එක click කරන්න කලින්, MFA approval එකට manually time දෙනවා
  const yesButton = page.getByRole('button', { name: 'Yes' });
  await yesButton.waitFor({ state: 'visible', timeout: 120_000 }); // 120s manual approval time
  await yesButton.click();

  await expect(page.locator('div').filter({ hasText: /^Home$/ })).toBeVisible({ timeout: 15_000 });

  await page.context().storageState({ path: authFile });
});