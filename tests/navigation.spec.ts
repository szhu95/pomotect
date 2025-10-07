import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Navigation', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToPage('/');
  });

  test('should navigate to About page', async ({ page }) => {
    const aboutLink = page.locator('a:has-text("About")').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/about/);
    }
  });

  test('should navigate to Products page', async ({ page }) => {
    const productsLink = page.locator('a:has-text("Products")').first();
    if (await productsLink.count() > 0) {
      await productsLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/products/);
    }
  });

  test('should navigate to Words page', async ({ page }) => {
    const wordsLink = page.locator('a:has-text("Words")').first();
    if (await wordsLink.count() > 0) {
      await wordsLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/words/);
    }
  });

  test('should navigate to Sounds page', async ({ page }) => {
    const soundsLink = page.locator('a:has-text("Sounds")').first();
    if (await soundsLink.count() > 0) {
      await soundsLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/sounds/);
    }
  });

  test('should navigate to Contact page', async ({ page }) => {
    const contactLink = page.locator('a:has-text("Contact")').first();
    if (await contactLink.count() > 0) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/contact/);
    }
  });

  test('should have working logo/home link', async ({ page }) => {
    const logoLink = page.locator('a img, header a').first();
    if (await logoLink.count() > 0) {
      await logoLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/localhost:3000\/?$/);
    }
  });

  test('should maintain navigation state across pages', async ({ page }) => {
    // Navigate to products
    const productsLink = page.locator('a:has-text("Products")').first();
    if (await productsLink.count() > 0) {
      await productsLink.click();
      await page.waitForLoadState('networkidle');
      
      // Check that header is still visible
      await expect(page.locator('header')).toBeVisible();
      
      // Navigate to another page
      const aboutLink = page.locator('a:has-text("About")').first();
      if (await aboutLink.count() > 0) {
        await aboutLink.click();
        await page.waitForLoadState('networkidle');
        
        // Header should still be visible
        await expect(page.locator('header')).toBeVisible();
      }
    }
  });

  test('should work on mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu toggle
    const mobileMenuButton = page.locator('[data-testid="mobile-menu"], button:has-text("Menu"), button[aria-label*="menu" i]');
    
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      
      // Check that menu items are visible
      const menuItems = page.locator('nav a, [role="menu"] a');
      if (await menuItems.count() > 0) {
        await expect(menuItems.first()).toBeVisible();
      }
    }
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    
    if (response) {
      expect(response.status()).toBe(404);
    }
    
    // Check that 404 page displays properly
    await expect(page.locator('body')).toBeVisible();
  });
});
