import { test, expect } from '@playwright/test';

test.describe('Settings - Master Cost Centers - Edit', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/system-management');
    await page.getByRole('button', { name: 'Master Cost Centers' }).click();
  });

  test('Test Cost Center (row 109) එකේ Region එක Edit කිරීම', async ({ page }) => {
    const updatedRegion = 'Colombo';

    await page.locator('tr:nth-child(109) > td:nth-child(7) > .sys-icon-btn.edit').click();

    const regionField = page.getByRole('textbox').nth(2);
    await regionField.fill(updatedRegion);
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // ✅ Assertion - update success verify කරනවා
    await expect(page.getByRole('button', { name: 'Save Changes' })).not.toBeVisible({ timeout: 10000 });
  });

});