import { test, expect } from '@playwright/test';

test.describe('Rate Card - Update Fuel Prices', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
  });

  test('Diesel Price එක Update කිරීම', async ({ page }) => {
    const newDieselPrice = '393.00';

    await page.getByRole('button', { name: 'Update Fuel Prices' }).click();

    // Diesel Price field එක clear කරලා, අලුත් value එක fill කරනවා
    const dieselField = page.getByRole('spinbutton', { name: 'Diesel Price (Rs.)' });
    await dieselField.fill(newDieselPrice);

    await page.getByRole('button', { name: 'Update Prices' }).click();

    // ✅ Assertion - updated price page එකේ පේනවද verify කරනවා
    await expect(page.getByText('Rs. 393.00')).toBeVisible({ timeout: 10000 });
  });

});