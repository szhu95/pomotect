import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Mobile Experience', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Check that main elements are visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have mobile-friendly navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Look for mobile menu toggle
    const mobileMenuButton = page.locator(
      '[data-testid="mobile-menu"], button:has-text("Menu"), button[aria-label*="menu" i], .mobile-menu-toggle'
    );
    
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      
      // Check that menu items are visible
      const menuItems = page.locator('nav a, [role="menu"] a, .mobile-menu a');
      if (await menuItems.count() > 0) {
        await expect(menuItems.first()).toBeVisible();
      }
    }
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Test touch interactions
    const touchableElements = page.locator('button, a, input');
    
    if (await touchableElements.count() > 0) {
      const element = touchableElements.first();
      await element.tap();
      await page.waitForTimeout(500);
    }
  });

  test('should display content properly on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await helpers.navigateToPage('/');
    
    // Check that content is not cut off
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Check that text is readable
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
    if (await textElements.count() > 0) {
      await expect(textElements.first()).toBeVisible();
    }
  });

  test('should handle mobile forms properly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Test newsletter form on mobile
    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.count() > 0) {
      await emailInput.tap();
      await emailInput.fill('test@example.com');
      
      // Check that mobile keyboard doesn't break layout
      const bodyRect = await page.locator('body').boundingBox();
      expect(bodyRect?.width).toBe(375);
    }
  });

  test('should handle mobile product browsing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/products');
    
    // Check that products are displayed properly on mobile
    const productContainers = page.locator('[data-testid="product"], .product, article');
    if (await productContainers.count() > 0) {
      await expect(productContainers.first()).toBeVisible();
      
      // Test swiping/scrolling
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);
      
      // Content should still be visible
      await expect(productContainers.first()).toBeVisible();
    }
  });

  test('should handle mobile article reading', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/words');
    
    // Look for article links
    const articleLinks = page.locator('a[href*="/words/"]');
    if (await articleLinks.count() > 0) {
      await articleLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Check that article content is readable on mobile
      const articleContent = page.locator('article, .content, .post-content');
      if (await articleContent.count() > 0) {
        await expect(articleContent.first()).toBeVisible();
        
        // Test scrolling through article
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        
        // Should be able to scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
      }
    }
  });

  test('should handle mobile cart functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/cart');
    
    // Check that cart is accessible on mobile
    await expect(page.locator('main, .cart-content')).toBeVisible();
    
    // Test cart interactions
    const cartButtons = page.locator('button, a');
    if (await cartButtons.count() > 0) {
      await cartButtons.first().tap();
      await page.waitForTimeout(500);
    }
  });

  test('should handle mobile contact forms', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/contact');
    
    // Test form interactions on mobile
    const inputs = page.locator('input, textarea');
    if (await inputs.count() > 0) {
      const firstInput = inputs.first();
      await firstInput.tap();
      await firstInput.fill('Test');
      
      // Check that form doesn't break layout
      const bodyRect = await page.locator('body').boundingBox();
      expect(bodyRect?.width).toBe(375);
    }
  });

  test('should handle mobile image viewing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Test image interactions
    const images = page.locator('img');
    if (await images.count() > 0) {
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();
      
      // Test image tap/click
      await firstImage.tap();
      await page.waitForTimeout(500);
      
      // Check for modal or zoom functionality
      const modal = page.locator('.modal, .zoom, [data-testid="image-modal"]');
      if (await modal.count() > 0) {
        await expect(modal.first()).toBeVisible();
        
        // Test closing modal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    }
  });

  test('should handle mobile performance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await helpers.navigateToPage('/');
    const loadTime = Date.now() - startTime;
    
    // Mobile should load within reasonable time
    expect(loadTime).toBeLessThan(8000);
    
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle orientation changes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await helpers.navigateToPage('/');
    
    // Change to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(1000);
    
    // Content should still be visible
    await expect(page.locator('main')).toBeVisible();
    
    // Change back to portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Content should still be visible
    await expect(page.locator('main')).toBeVisible();
  });
});
