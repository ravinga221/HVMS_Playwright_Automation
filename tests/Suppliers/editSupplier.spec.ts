// tests/Suppliers/editSupplier.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Suppliers - Edit Supplier', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Suppliers$/ }).click();
  });

  test('Supplier Record එකක් Edit කිරීම', async ({ page }) => {
    const supplierName = `EditTest_${Date.now().toString().slice(-4)}`;
    const originalContact = 'Deshani';
    const updatedContact = 'Ravinga';

    // 1. මුලින්ම test-only supplier කෙනෙක් create කරනවා
    await page.getByRole('button', { name: '+ Add Supplier' }).click();
    await page.locator('input[name="name"]').fill(supplierName);
    await page.locator('input[name="contact_person"]').fill(originalContact);
    await page.getByRole('textbox', { name: 'Format: 10 digits (e.g. 077-' }).fill('0773366552');
    await page.getByRole('button', { name: 'Save Supplier' }).click();

    // 2. Created supplier එක table එකේ පේනවද confirm කරනවා
    await expect(page.getByRole('cell', { name: supplierName })).toBeVisible({ timeout: 10000 });

    // 3. Edit modal එක open කරනවා
    await page.getByRole('cell', { name: supplierName }).click();
    await page.getByRole('button', { name: 'Edit' }).first().click();

    // 4. Contact Person update කරනවා
    await page.locator('input[name="contact_person"]').fill(updatedContact);
    await page.getByRole('button', { name: 'Update Record' }).click();

    // 5. ✅ Assertion - update success verify කරනවා
    await expect(page.getByRole('row').filter({ hasText: supplierName })).toContainText(updatedContact, { timeout: 10000 });
  });

});