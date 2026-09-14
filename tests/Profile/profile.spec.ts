import { test, expect } from '@playwright/test';

test.describe('Profile Page - User Account Management', () => {

  test.beforeEach(async ({ page }) => {
    // Already authenticated (storageState set at project level in config)
    await page.goto('/profile'); // actual profile page path එකට replace කරන්න ඕන
  });

  test('අලුත් User Account එකක් Create කිරීම', async ({ page }) => {
    // Test data - reuse කරන්න easy වෙන්න variables විදිහට
    const serviceNumber = '3612@intranet.slt.com.lk';
    const fullName = 'Ravinga Deshani';
    const designation = 'Manager';
    const role = 'Moderator';

    // 1. Profile section එකට navigate වෙනවා (already page එකේ ඉන්නවනම් මේක ඕන නෑ)
    await page.locator('div').filter({ hasText: /^Profile$/ }).click();

    // 2. Service number fill කරනවා
    await page.getByRole('textbox', { name: 'service_number@intranet.slt.' })
      .fill(serviceNumber);

    // 3. Full name fill කරනවා
    await page.getByRole('textbox', { name: 'e.g. John Doe' })
      .fill(fullName);

    // 4. Designation fill කරනවා
    await page.getByRole('textbox', { name: 'e.g. Manager' })
      .fill(designation);

    // 5. Role select කරනවා (dropdown)
    await page.getByRole('combobox').selectOption(role);

    // 6. Centers select කරනවා
    await page.getByRole('button', { name: 'Select Centers' }).click();
    await page.locator('.modal-content > div:nth-child(2) > div > div').first().click();
    await page.getByRole('button', { name: 'Done' }).click();

    // 7. Account create කරනවා
    await page.getByRole('button', { name: 'Create User Account' }).click();

    // 8. ✅ Assertion - success verify කරන්න (actual success message/element එකට replace කරන්න)
    // await expect(page.getByText('User account created successfully')).toBeVisible();
    // await expect(page.getByText(fullName)).toBeVisible();
  });

});