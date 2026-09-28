import { test, expect } from '@playwright/test';

test.describe('Rate Card - Before 2000', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
    await page.getByRole('button', { name: 'BEFORE' }).click();
  });

  test('Passenger Vans - Diesel Rate එකක් Edit කිරීම', async ({ page }) => {
    await page.getByText('Hour Double Driver').click();
    await page.locator('div').filter({ hasText: /^Passenger Vans$/ }).nth(2).click();
    await page.getByText('DIESEL', { exact: true }).click();

    // "up to -1000 km" row එකේ Edit click කරනවා
    const row = page.getByRole('row', { name: /up to -1000 km/ });
    await row.getByRole('button', { name: 'Edit' }).click();

    // Rental field එකේ value වෙනස් කරනවා
    await row.locator('input').first().fill('131876');

    await row.getByRole('button', { name: 'Save' }).click();

    // ✅ Assertion - updated value පේනවද verify කරනවා
    await expect(row.getByText('131,876')).toBeVisible({ timeout: 10000 });
  });

  test('Generator sections expand වෙනවද verify කිරීම', async ({ page }) => {
    // Generator (Without Driver & Fuel)
    await page.locator('div').filter({ hasText: /^Generator \(Without Driver & Fuel\)$/ }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Large Vans$/ }).nth(2).click();
    await expect(page.locator('div').filter({ hasText: /^General$/ }).nth(2)).toBeVisible();

    // Generator (With Driver & Fuel)
    await page.locator('div').filter({ hasText: /^Generator \(With Driver & Fuel\)$/ }).nth(1).click();
    await expect(page.getByText('Large Vans').nth(1)).toBeVisible();
  });

});