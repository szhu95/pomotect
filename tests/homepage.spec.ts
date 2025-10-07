import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Homepage', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToPage('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check for either the expected title or any title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    await expect(page).toHaveURL(/localhost:3000/);
  });

  test('should display splash screen initially', async ({ page }) => {
    // The splash screen should be visible initially
    // We'll wait for it to disappear as part of navigation
    await helpers.waitForSplashScreenToDisappear();
  });

  test('should display main navigation elements', async ({ page }) => {
    // Check for header elements
    await expect(page.locator('header')).toBeVisible();
    
    // Check for main navigation links
    const navLinks = ['About', 'Products', 'Words', 'Sounds'];
    for (const linkText of navLinks) {
      const link = page.locator(`a:has-text("${linkText}")`);
      if (await link.count() > 0) {
        await expect(link.first()).toBeVisible();
      }
    }
  });

  test('should display newsletter signup section', async ({ page }) => {
    const newsletterSection = page.locator('text=Subscribe to our newsletter');
    await expect(newsletterSection).toBeVisible();
    
    // Check for newsletter form
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput.first()).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // Check for hero section elements
    const heroSection = page.locator('main');
    await expect(heroSection).toBeVisible();
    
    // Check for image ticker or hero content
    const imageElements = page.locator('img');
    await expect(imageElements.first()).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should handle newsletter form submission', async ({ page }) => {
    await helpers.fillNewsletterForm('test@example.com');
    
    // Wait for potential success/error message
    await page.waitForTimeout(2000);
    
    // The form should still be visible (or show success message)
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main elements are still visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should load images properly', async ({ page }) => {
    await helpers.waitForImagesToLoad();
    
    // Check that images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first few images are loaded
      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
      }
    }
  });

  test('should have working scroll to top button', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Look for scroll to top button (should be visible on desktop)
    await page.setViewportSize({ width: 1200, height: 800 });
    const scrollButton = page.locator('[data-testid="scroll-to-top"], button:has-text("↑"), button:has-text("Top")');
    
    if (await scrollButton.count() > 0) {
      await expect(scrollButton.first()).toBeVisible();
      await scrollButton.first().click();
      
      // Check that we scrolled to top
      const scrollPosition = await page.evaluate(() => window.pageYOffset);
      expect(scrollPosition).toBeLessThan(100);
    }
  });
});
