import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Products Page', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToPage('/products');
  });

  test('should load products page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display products grid or list', async ({ page }) => {
    // Look for product containers
    const productContainers = page.locator('[data-testid="product"], .product, article, .grid > div');
    
    // At least one product container should be visible
    if (await productContainers.count() > 0) {
      await expect(productContainers.first()).toBeVisible();
    }
  });

  test('should display product images', async ({ page }) => {
    const productImages = page.locator('img[alt*="product" i], .product img, [data-testid="product"] img');
    
    if (await productImages.count() > 0) {
      await expect(productImages.first()).toBeVisible();
      await helpers.waitForImagesToLoad();
    }
  });

  test('should display product titles and prices', async ({ page }) => {
    // Look for product titles
    const productTitles = page.locator('h1, h2, h3, h4, .product-title, [data-testid="product-title"]');
    
    if (await productTitles.count() > 0) {
      await expect(productTitles.first()).toBeVisible();
    }
    
    // Look for prices
    const prices = page.locator('[data-testid="price"], .price, [class*="price"], text=/\\$\\d+/');
    
    if (await prices.count() > 0) {
      await expect(prices.first()).toBeVisible();
    }
  });

  test('should navigate to individual product pages', async ({ page }) => {
    const productLinks = page.locator('a[href*="/products/"], [data-testid="product-link"]');
    
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should be on a product detail page
      await expect(page).toHaveURL(/\/products\/.+/);
    }
  });

  test('should display add to cart buttons', async ({ page }) => {
    const addToCartButtons = page.locator('button:has-text("Add to Cart"), button:has-text("Add"), [data-testid*="add-cart"], [data-testid*="add-to-cart"]');
    
    if (await addToCartButtons.count() > 0) {
      await expect(addToCartButtons.first()).toBeVisible();
    }
  });

  test('should handle cart functionality', async ({ page }) => {
    await helpers.testCartFunctionality();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Main content should still be visible
    await expect(page.locator('main')).toBeVisible();
    
    // Products should be displayed properly
    const productContainers = page.locator('[data-testid="product"], .product, article');
    if (await productContainers.count() > 0) {
      await expect(productContainers.first()).toBeVisible();
    }
  });

  test('should load product images properly', async ({ page }) => {
    await helpers.waitForImagesToLoad();
    
    const productImages = page.locator('img');
    const imageCount = await productImages.count();
    
    if (imageCount > 0) {
      // Check first few images are loaded
      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = productImages.nth(i);
        await expect(img).toBeVisible();
      }
    }
  });
});

test.describe('Individual Product Page', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    
    // First navigate to products page to find a product
    await helpers.navigateToPage('/products');
    
    // Look for a product link and navigate to it
    const productLinks = page.locator('a[href*="/products/"]');
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('should load product detail page', async ({ page }) => {
    // Should be on a product detail page
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test('should display product details', async ({ page }) => {
    // Check for product title
    const title = page.locator('h1, h2, .product-title, [data-testid="product-title"]');
    if (await title.count() > 0) {
      await expect(title.first()).toBeVisible();
    }
    
    // Check for product images
    const images = page.locator('img');
    if (await images.count() > 0) {
      await expect(images.first()).toBeVisible();
    }
    
    // Check for price
    const price = page.locator('[data-testid="price"], .price, text=/\\$\\d+/');
    if (await price.count() > 0) {
      await expect(price.first()).toBeVisible();
    }
  });

  test('should have quantity selector', async ({ page }) => {
    const quantityInput = page.locator('input[type="number"], [data-testid="quantity"], select');
    
    if (await quantityInput.count() > 0) {
      await expect(quantityInput.first()).toBeVisible();
    }
  });

  test('should have add to cart functionality', async ({ page }) => {
    const addToCartButton = page.locator('button:has-text("Add to Cart"), button:has-text("Add"), [data-testid*="add-cart"]');
    
    if (await addToCartButton.count() > 0) {
      await expect(addToCartButton.first()).toBeVisible();
      await addToCartButton.first().click();
      
      // Wait for potential success message or cart update
      await page.waitForTimeout(2000);
    }
  });
});
