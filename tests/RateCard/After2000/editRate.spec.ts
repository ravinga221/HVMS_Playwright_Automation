import { test, expect } from '@playwright/test';

test.describe('Rate Card - After 2000', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
    await page.getByRole('button', { name: 'AFTER' }).click();
  });

  test('Double Cabs-2 WD - Diesel Rate එකක් Edit කිරීම', async ({ page }) => {
    // Accordion sections expand කරනවා
    await page.locator('div').filter({ hasText: /^24 Hour Double Driver$/ }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Double Cabs-2 WD$/ }).nth(1).click();

    // Diesel section එකට යනවා
    await page.getByText('DIESEL', { exact: true }).click();

    // "up to -1000 km" row එකේ edit button එක click කරනවා
    await page.getByRole('row', { name: 'up to -1000 km 195,759.86 78.' }).getByRole('button').click();

    // Save කරනවා
    await page.getByRole('button', { name: 'Save' }).click();

    // ✅ Assertion - save success verify කරනවා (actual success indicator එකට replace කරන්න)
    // await expect(page.getByText('Rate updated successfully')).toBeVisible();
  });

});