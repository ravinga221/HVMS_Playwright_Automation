import { test, expect } from '@playwright/test';

test.describe('Settings - Manage Vehicles - Add', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Settings$/ }).click();
    await page.getByRole('button', { name: 'Manage Vehicles' }).click();
  });

  test('අලුත් Vehicle එකක් Add කිරීම', async ({ page }) => {
    const vehicleNo = `WP-${Date.now().toString().slice(-4)}`; // dynamic, unique vehicle no
    const manufactureYear = '2023';

    // Cost Center select කරනවා
    await page.locator('.sys-card > div > div > div').click();
    await page.getByText('Head Office / Other (0)').click();

    // Reference Number select කරනවා
    await page.getByRole('combobox').selectOption('Ref No');

    // Vehicle No fill කරනවා
    await page.getByRole('textbox', { name: 'Expected format: WP-1234, ABC' }).fill(vehicleNo);

    // Vehicle Type select කරනවා
    await page.locator('select[name="vehicle_type"]').selectOption('Bike');

    // Manufacture Year fill කරනවා
    await page.getByRole('spinbutton', { name: 'Manufacture Year must be' }).fill(manufactureYear);

    // Hire Type select කරනවා
    await page.locator('select[name="hire_type"]').selectOption('Self Vehicles');

    // Save කරනවා
    await page.getByRole('button', { name: 'Save Vehicle Details' }).click();

    // ✅ Assertion - vehicle successfully save වුණාද verify කරනවා
    await expect(page.getByRole('textbox', { name: 'Expected format: WP-1234, ABC' })).toHaveValue(vehicleNo);
  });

});