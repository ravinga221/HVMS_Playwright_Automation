import { test, expect } from '@playwright/test';

test.describe('Settings - Master Cost Centers - Add', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/system-management');
    await page.getByRole('button', { name: 'Master Cost Centers' }).click();
  });

  test('අලුත් Cost Center එකක් Add කිරීම', async ({ page }) => {
    // Unique ID එකක් generate කරනවා - duplicate run වලදී conflict වෙන්නෙ නැති වෙන්න
    const costCenterId = '3613'; 
    const costCenterName = 'RD_Nittabuwa';
    const region = 'Gampaha';
    const refNo = 'RD/01';

    await page.getByRole('button', { name: 'Add Cost Center' }).click();

    // Cost Center ID
    await page.getByRole('spinbutton', { name: 'e.g.,' }).fill(costCenterId);

    // Cost Center Name
    await page.getByRole('textbox', { name: 'e.g., OPMC_Kandy' }).fill(costCenterName);

    // Region
    await page.getByRole('textbox', { name: 'e.g., Kandy' }).fill(region);

    // DGM dropdown
    await page.getByRole('combobox', { name: 'e.g., DGM-Provincial' }).click();
    await page.getByRole('combobox', { name: 'e.g., DGM-Provincial' }).fill('DGM-A & MS');

    // GM dropdown
    await page.getByRole('combobox', { name: 'e.g., GM-Regional Operations' }).click();
    await page.getByRole('combobox', { name: 'e.g., GM-Regional Operations' }).fill('GM-Facility Management');

    // Ref No
    await page.getByRole('textbox', { name: 'Expected format: ABC/01, WPSE' }).fill(refNo);

    // Submit
    await page.locator('form').getByRole('button', { name: 'Add Cost Center' }).click();

    // ✅ Assertion - newly created cost center table එකේ පේනවද verify කරනවා
    await expect(page.getByText(costCenterName)).toBeVisible();
    await expect(page.getByText(costCenterId)).toBeVisible();
  });

});