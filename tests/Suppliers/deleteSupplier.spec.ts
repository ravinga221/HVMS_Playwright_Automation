// tests/Suppliers/deleteSupplier.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Suppliers - Delete Supplier', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Suppliers$/ }).click();
  });

  test('Supplier Record එකක් Delete කිරීම', async ({ page }) => {
    const supplierName = `DeleteTest_${Date.now().toString().slice(-4)}`;

    // 1. මුලින්ම test-only supplier කෙනෙක් create කරනවා
    await page.getByRole('button', { name: '+ Add Supplier' }).click();
    await page.locator('input[name="name"]').fill(supplierName);
    await page.locator('input[name="contact_person"]').fill('Test Contact');
    await page.getByRole('textbox', { name: 'Format: 10 digits (e.g. 077-' }).fill('0773366552');
    await page.getByRole('button', { name: 'Save Supplier' }).click();

    // 2. Created supplier එක table එකේ පේනවද confirm කරනවා
    await expect(page.getByRole('cell', { name: supplierName })).toBeVisible({ timeout: 10000 });

    // 3. Supplier row එක select කරලා Delete කරනවා
    await page.getByRole('cell', { name: supplierName }).click();
    await page.getByRole('button', { name: 'Delete' }).first().click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    // 4. ✅ Assertion - delete success verify කරනවා (table එකෙන් අයින් වුණාද)
    await expect(page.getByRole('cell', { name: supplierName })).not.toBeVisible({ timeout: 10000 });
  });

});