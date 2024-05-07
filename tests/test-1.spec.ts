import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();
  await page.getByLabel('M', { exact: true }).click();
  await page.getByLabel('Yellow').click();
  await page.getByLabel('Qty').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
});