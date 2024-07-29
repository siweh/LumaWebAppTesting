import { test, expect } from '@playwright/test';
import { ugBaseUrl, bwBaseUrl } from './../playwright.config'
// import { log } from 'console';

test.beforeEach(async ({ page }) => {
    await page.goto(`${ugBaseUrl}`);
});

test('Add a product to cart and randomly selects color and size', async ({ page }) => {
    await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();

  //[ 'XSSMLXL' ]
  const sizes = ["XS", "S", "M", ,"L", "XL"]
  var random_size = String(sizes[Math.floor(Math.random() * sizes.length)])
  console.log(random_size);
  await page.waitForTimeout(2000);
  await page.getByLabel(random_size, { exact: true }).click();

  const colors = ["Yellow", "White", "Purple"]
  var random_color = String(colors[Math.floor(Math.random() * colors.length)])
  console.log(random_color);

  await page.getByLabel(random_color, {exact: true}).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Add to Cart' }).click();
});

test('Add product to cart without size', async ({ page }) => {
  await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();
  await page.getByLabel('M', {exact: true}).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.getByText('This is a required field.')).toBeVisible();
});

test('Add product to cart without color', async ({ page }) => {
  await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();
  await page.getByLabel('White', {exact: true}).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.getByText('This is a required field.')).toBeVisible();
});

test('Add a product with a quantity over the maximum size', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
  });

  await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();
  await page.getByLabel('M', {exact: true}).click();
  await page.getByLabel('White', {exact: true}).click();
  
  await page.getByTitle('Qty').fill('1000000000000000000');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  // await page.waitForSelector('#qty-error');
  await expect(page.getByText('The maximum you may purchase is 10000.')).toBeVisible();
});

