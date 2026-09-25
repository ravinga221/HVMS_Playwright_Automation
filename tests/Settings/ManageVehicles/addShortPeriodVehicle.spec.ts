import { test, expect } from '@playwright/test';

test.describe('Settings - Manage Vehicles - Add Short Period Vehicle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Settings$/ }).click();
    await page.getByRole('button', { name: 'Manage Vehicles' }).click();
  });

  test('Short Period Vehicle එකක් Add කිරීම', async ({ page }) => {
    // Pattern: 2-3 letters + hyphen + exactly 4 digits (e.g. RDT-1234)
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // always 4 digits
    const vehicleNo = `RDT-${randomDigits}`;
    const manufactureYear = '2001';

    await page.getByRole('textbox', { name: 'Search cost center...' }).click();
    await page.getByText('Head Office / Other (0)').click();

    await page.getByRole('combobox').selectOption('NEW_SHORT_PERIOD');

    await page.getByRole('textbox', { name: 'Expected format: WP-1234, ABC' }).fill(vehicleNo);

    await page.locator('select[name="vehicle_type"]').selectOption('Large Vans');

    await page.getByRole('spinbutton', { name: 'Manufacture Year must be' }).fill(manufactureYear);

    await page.getByRole('button', { name: 'Save Vehicle Details' }).click();

    // ✅ Save success verify කරනවා - form reset වුණා කියන්නේ save success (empty state එකට යනවා)
    await expect(page.getByRole('textbox', { name: 'Expected format: WP-1234, ABC' })).toHaveValue('', { timeout: 10000 });
  });

});