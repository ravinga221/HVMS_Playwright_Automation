import { test, expect } from '@playwright/test';

test.describe('Settings - User Directory', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/system-management');
    await page.getByRole('button', { name: 'User Directory' }).click();
  });

  test('Test User (row 18) එකේ Name එක Edit කිරීම', async ({ page }) => {
    await page.locator('tr:nth-child(18) > td:nth-child(6) > .sys-icon-btn.edit').click();

    const nameField = page.getByRole('textbox').nth(2);
    await nameField.fill('Ravinga');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // ✅ Assertion - name update success verify කරනවා
    await expect(page.getByText('Ravinga')).toBeVisible();
  });

  test('User Search කිරීම', async ({ page }) => {
    await page.locator('.sys-search-box').click();
    await page.getByRole('textbox', { name: 'Search users...' }).fill('admin');
    await page.getByRole('textbox', { name: 'Search users...' }).press('Enter');

    // ✅ Assertion - search results table එකේ "admin" role එක පේනවද check කරනවා
    await expect(page.getByRole('row').filter({ hasText: 'admin' }).first()).toBeVisible();

    // Search box clear කරනවා
    await page.getByRole('textbox', { name: 'Search users...' }).fill('');
    await page.getByRole('textbox', { name: 'Search users...' }).press('Enter');
  });

  test('Test User (row 18) එක Delete කිරීම', async ({ page }) => {
    await page.locator('tr:nth-child(18) > td:nth-child(6) > .sys-icon-btn.delete').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    // ✅ Assertion - delete success (row count එක අඩු වුණාද, හෝ user name එක නැති වුණාද check කරන්න)
    // await expect(page.getByText('Ravinga')).not.toBeVisible();
  });

});