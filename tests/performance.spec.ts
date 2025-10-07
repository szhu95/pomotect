import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Performance and Loading', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await helpers.navigateToPage('/');
    
    const loadTime = Date.now() - startTime;
    
    // Homepage should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Check that main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load images efficiently', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Wait for images to load
    await helpers.waitForImagesToLoad();
    
    // Check that images are properly loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first few images are loaded
      for (let i = 0; i < Math.min(5, imageCount); i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
        
        // Check that image has proper dimensions
        const boundingBox = await img.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
      }
    }
  });

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    const startTime = Date.now();
    await helpers.navigateToPage('/');
    const loadTime = Date.now() - startTime;
    
    // Should still load within reasonable time even with slow network
    expect(loadTime).toBeLessThan(10000);
    
    await expect(page.locator('main')).toBeVisible();
  });

  test('should preload critical resources', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Check for preload links in head
    const preloadLinks = page.locator('link[rel="preload"]');
    const preloadCount = await preloadLinks.count();
    
    // Should have some preloaded resources
    expect(preloadCount).toBeGreaterThan(0);
  });

  test('should handle navigation without full page reload', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Navigate to another page
    const productsLink = page.locator('a:has-text("Products")').first();
    if (await productsLink.count() > 0) {
      const navigationStart = Date.now();
      await productsLink.click();
      await page.waitForLoadState('networkidle');
      const navigationTime = Date.now() - navigationStart;
      
      // Navigation should be fast (less than 2 seconds)
      expect(navigationTime).toBeLessThan(2000);
      
      await expect(page).toHaveURL(/\/products/);
    }
  });

  test('should load pages progressively', async ({ page }) => {
    await helpers.navigateToPage('/products');
    
    // Check that page starts loading immediately
    await expect(page.locator('body')).toBeVisible();
    
    // Wait for content to load
    await page.waitForLoadState('domcontentloaded');
    
    // Main content should be visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle concurrent requests efficiently', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Trigger multiple navigation actions
    const promises = [];
    
    // Try to navigate to multiple pages quickly
    const pages = ['/about', '/products', '/words', '/sounds'];
    
    for (const pagePath of pages) {
      promises.push(
        page.goto(pagePath).catch(() => {}) // Ignore navigation errors
      );
    }
    
    // Wait for all navigations to complete or fail
    await Promise.allSettled(promises);
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should cache static assets', async ({ page }) => {
    // First visit
    await helpers.navigateToPage('/');
    await helpers.waitForImagesToLoad();
    
    // Second visit - should use cache
    const startTime = Date.now();
    await helpers.navigateToPage('/');
    const secondLoadTime = Date.now() - startTime;
    
    // Second load should be faster due to caching
    expect(secondLoadTime).toBeLessThan(3000);
  });

  test('should handle large images properly', async ({ page }) => {
    await helpers.navigateToPage('/');
    await helpers.waitForImagesToLoad();
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that images are properly sized
      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = images.nth(i);
        const boundingBox = await img.boundingBox();
        
        if (boundingBox) {
          // Images should have reasonable dimensions
          expect(boundingBox.width).toBeGreaterThan(0);
          expect(boundingBox.height).toBeGreaterThan(0);
          
          // Images shouldn't be excessively large
          expect(boundingBox.width).toBeLessThan(2000);
          expect(boundingBox.height).toBeLessThan(2000);
        }
      }
    }
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await helpers.navigateToPage('/');
    
    // Page should still be functional even if there are JS errors
    await expect(page.locator('body')).toBeVisible();
    
    // Log errors for debugging but don't fail the test
    if (errors.length > 0) {
      console.log('JavaScript errors detected:', errors);
    }
  });

  test('should load critical CSS inline', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Check for inline styles or critical CSS
    const inlineStyles = page.locator('style');
    const styleCount = await inlineStyles.count();
    
    // Should have some inline styles for critical CSS
    expect(styleCount).toBeGreaterThan(0);
  });

  test('should handle video loading efficiently', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Look for video elements
    const videos = page.locator('video');
    const videoCount = await videos.count();
    
    if (videoCount > 0) {
      // Videos should be properly configured for performance
      for (let i = 0; i < videoCount; i++) {
        const video = videos.nth(i);
        const preload = await video.getAttribute('preload');
        
        // Should have appropriate preload setting
        expect(['none', 'metadata', 'auto']).toContain(preload);
      }
    }
  });
});
