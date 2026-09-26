// tests/RateCard/deleteRateCard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Rate Card - Delete Confirmation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Rate Card$/ }).click();
  });

  test('Delete Rate Card - Confirmation Dialog එක පේනවද Verify කිරීම (Cancel කරනවා)', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete Rate Card' }).click();

    // ✅ Assertion - confirmation dialog එක/message එක පේනවද verify කරනවා
    // (actual dialog text එකට replace කරන්න, e.g. "Are you sure you want to delete?")
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // ⚠️ Actual delete එක avoid කරන්න Cancel click කරනවා (real data protect කරන්න)
    await page.getByRole('button', { name: 'Cancel' }).click();

    // ✅ Dialog close වුණාද confirm කරනවා
    await expect(page.getByRole('button', { name: 'Cancel' })).not.toBeVisible();
  });

});