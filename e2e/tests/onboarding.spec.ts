import { test, expect } from '@playwright/test';

const USER = process.env.E2E_USER || '';
const PASS = process.env.E2E_PASS || '';

test('Neo HCM Onboarding loads', async ({ page }) => {
  const base = process.env.E2E_BASE_URL!;
  await page.goto(base + '/login');
  if (USER && PASS) {
    await page.fill('input[data-fieldname="usr"]', USER);
    await page.fill('input[data-fieldname="pwd"]', PASS);
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/app');
  }
  await page.goto(base + '/app/neo-hcm-onboarding');
  await expect(page.getByText('Neo HCM Onboarding')).toBeVisible();
  await expect(page.getByText('Open Settings')).toBeVisible();
});
