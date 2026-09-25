import { test, expect } from '@playwright/test';

test.describe('Suppliers - Add Supplier', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Suppliers$/ }).click();
  });

  test('අලුත් Supplier කෙනෙක් Add කිරීම', async ({ page }) => {
    const supplierName = `Ravi_${Date.now().toString().slice(-4)}`; // dynamic, unique name
    const contactPerson = 'Deshani';
    const phoneNumber = '0773366552';

    await page.getByRole('button', { name: '+ Add Supplier' }).click();

    await page.locator('input[name="name"]').fill(supplierName);
    await page.locator('input[name="contact_person"]').fill(contactPerson);
    await page.getByRole('textbox', { name: 'Format: 10 digits (e.g. 077-' }).fill(phoneNumber);

    await page.getByRole('button', { name: 'Save Supplier' }).click();

    // ✅ Assertion - supplier registry table එකේ අලුතෙන් add වුණ supplier එක පේනවද verify කරනවා
    await expect(page.getByRole('row').filter({ hasText: supplierName })).toBeVisible({ timeout: 10000 });
  });

});