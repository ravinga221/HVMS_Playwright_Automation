import { test, expect } from '@playwright/test';

test.describe('Rate Card - Vehicle Categories - Add New Vehicle Type', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
    await page.getByRole('button', { name: 'VEHICLE CATEGORIES' }).click();
  });

  test('අලුත් Vehicle Type එකක් සමඟ Column Match එකක් Add කිරීම', async ({ page }) => {
    const suffix = Date.now().toString().slice(-4);
    const columnName = `autobus${suffix}`;
    const vehicleTypeName = `AutoBus${suffix}`;

    await page.getByRole('button', { name: 'Add Column Match' }).click();

    // Excel column name
    await page.getByRole('textbox', { name: 'e.g. Heavy Trucks 4x4' }).fill(columnName);

    // "+ Add a new vehicle type" option එක select කරනවා
    await page.getByRole('combobox').selectOption('NEW');

    // අලුතින් එන Vehicle Type name field එක
    await page.getByRole('textbox', { name: 'e.g. Heavy Trucks', exact: true }).fill(vehicleTypeName);

    // Fuel type
    await page.getByRole('radio', { name: 'Diesel' }).check();

    await page.getByRole('button', { name: 'Save Match' }).click();

    // ✅ Assertion - අලුත් row එක table එකේ පේනවද
    const newRow = page.getByRole('row').filter({ hasText: columnName });
    await expect(newRow).toBeVisible({ timeout: 10000 });
    await expect(newRow).toContainText(vehicleTypeName);
    await expect(newRow).toContainText('DIESEL');

    // 🧹 Cleanup - test row එක delete කරනවා
    await newRow.getByRole('button').click();
    // Confirm dialog එකක් ආවොත් uncomment කරන්න:
    // await page.getByRole('button', { name: 'Confirm' }).click();
  });

});