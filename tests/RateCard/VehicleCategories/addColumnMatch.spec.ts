import { test, expect } from '@playwright/test';

test.describe('Rate Card - Vehicle Categories - Add Column Match', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
    await page.getByRole('button', { name: 'VEHICLE CATEGORIES' }).click();
  });

  test('අලුත් Column Match එකක් Add කිරීම', async ({ page }) => {
    const columnName = `autotest${Date.now().toString().slice(-4)}`;

    await page.getByRole('button', { name: 'Add Column Match' }).click();

    // Excel column name
    await page.getByRole('textbox', { name: 'e.g. Heavy Trucks 4x4' }).fill(columnName);

    // Vehicle type (B01 = Bike)
    await page.getByRole('combobox').selectOption('B01');

    // Fuel type
    await page.getByText('Petrol', { exact: true }).click();

    await page.getByRole('button', { name: 'Save Match' }).click();

    // ✅ Assertion - අලුත් row එක table එකේ පේනවද
    const newRow = page.getByRole('row').filter({ hasText: columnName });
    await expect(newRow).toBeVisible({ timeout: 10000 });
    await expect(newRow).toContainText('Bike');
    await expect(newRow).toContainText('PETROL');

    // 🧹 Cleanup - test data delete කරනවා (row එකේම delete icon)
    await newRow.getByRole('button').click();
    // Confirm dialog එකක් ආවොත් uncomment කරන්න:
    // await page.getByRole('button', { name: 'Confirm' }).click();
  });

});