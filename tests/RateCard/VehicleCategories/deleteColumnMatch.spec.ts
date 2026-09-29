import { test, expect } from '@playwright/test';

test.describe('Rate Card - Vehicle Categories - Delete Column Match', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
    await page.getByRole('button', { name: 'VEHICLE CATEGORIES' }).click();
  });

  test('Column Match එකක් Create කරලා Delete කිරීම', async ({ page }) => {
    const columnName = `autodel${Date.now().toString().slice(-4)}`;

    // 1. මුලින්ම test-only column match එකක් create කරනවා
    await page.getByRole('button', { name: 'Add Column Match' }).click();
    await page.getByRole('textbox', { name: 'e.g. Heavy Trucks 4x4' }).fill(columnName);
    await page.getByRole('combobox').selectOption('B01'); // Bike
    await page.getByText('Petrol', { exact: true }).click();
    await page.getByRole('button', { name: 'Save Match' }).click();

    // 2. Created row එක table එකේ පේනවද confirm කරනවා
    const row = page.getByRole('row').filter({ hasText: columnName });
    await expect(row).toBeVisible({ timeout: 10000 });

    // 3. Delete කරනවා
    await row.getByRole('button').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    // 4. ✅ Assertion - delete success verify කරනවා (row එක table එකෙන් අයින් වුණාද)
    await expect(row).not.toBeVisible({ timeout: 10000 });
  });

});