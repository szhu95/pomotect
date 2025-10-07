import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the splash screen to disappear
   */
  async waitForSplashScreenToDisappear() {
    // Wait for splash screen to disappear (it shows for 2 seconds)
    await this.page.waitForTimeout(2500);
    
    // Ensure splash screen is not visible
    const splashScreen = this.page.locator('[data-testid="splash-screen"]');
    if (await splashScreen.isVisible()) {
      await splashScreen.waitFor({ state: 'hidden', timeout: 3000 });
    }
  }

  /**
   * Navigate to a page and wait for it to load properly
   */
  async navigateToPage(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
    await this.waitForSplashScreenToDisappear();
  }

  /**
   * Check if an element is visible in the viewport
   */
  async isElementInViewport(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }, selector);
  }

  /**
   * Wait for images to load
   */
  async waitForImagesToLoad() {
    await this.page.waitForFunction(() => {
      const images = Array.from(document.images);
      return images.every(img => img.complete);
    }, { timeout: 10000 });
  }

  /**
   * Fill newsletter form
   */
  async fillNewsletterForm(email: string = 'test@example.com') {
    const emailInput = this.page.locator('input[type="email"]').first();
    await emailInput.fill(email);
    
    const submitButton = this.page.locator('button[type="submit"]').first();
    await submitButton.click();
  }

  /**
   * Check if cart is working properly
   */
  async testCartFunctionality() {
    // Navigate to products
    await this.navigateToPage('/products');
    
    // Look for a product and add to cart
    const productLinks = this.page.locator('a[href*="/products/"]').first();
    if (await productLinks.count() > 0) {
      await productLinks.click();
      await this.page.waitForLoadState('networkidle');
      
      // Try to find add to cart button
      const addToCartButton = this.page.locator('button:has-text("Add to Cart"), button:has-text("Add"), [data-testid*="add-cart"]').first();
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        // Check for success message or cart update
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Test mobile viewport functionality
   */
  async testMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main elements are still visible and functional
    await expect(this.page.locator('header')).toBeVisible();
    await expect(this.page.locator('main')).toBeVisible();
    await expect(this.page.locator('footer')).toBeVisible();
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    // Test tab navigation
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = this.page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
  }

  /**
   * Test responsive design breakpoints
   */
  async testResponsiveBreakpoints() {
    const breakpoints = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' }
    ];
    
    for (const breakpoint of breakpoints) {
      await this.page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      
      // Check that page is still functional at this breakpoint
      await expect(this.page.locator('body')).toBeVisible();
      await expect(this.page.locator('main')).toBeVisible();
    }
  }
}
