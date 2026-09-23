import { test, expect } from '@playwright/test';

test.describe('Settings - Master Cost Centers - Delete', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/system-management');
    await page.getByRole('button', { name: 'Master Cost Centers' }).click();
  });

  test('Test Cost Center (3612) එක Search කරලා Delete කිරීම', async ({ page }) => {
    const testCostCenterId = '3612';

    // Search කරනවා
    await page.getByRole('textbox', { name: 'Search cost centers...' }).fill(testCostCenterId);

    // ✅ Search result එකේ cost center එක පේනවද confirm කරනවා
    await expect(page.getByRole('cell', { name: testCostCenterId })).toBeVisible();

    // Delete icon click කරනවා (row එකේම, ID එකෙන් locate කරනවා - row number එකෙන් නෙවෙයි)
    await page.locator('tr', { hasText: testCostCenterId })
      .locator('.sys-icon-btn.delete').click();

    // Confirm dialog එකේ Confirm click කරනවා
    await page.getByRole('button', { name: 'Confirm' }).click();

    // ✅ Assertion - delete වුණාද verify කරනවා (search results එකෙන් අයින් වුණාද)
    await expect(page.getByRole('cell', { name: testCostCenterId })).not.toBeVisible();
  });

});