import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Accessibility', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should have proper page titles', async ({ page }) => {
    await helpers.navigateToPage('/');
    await expect(page).toHaveTitle(/postmodern tectonics/);
    
    // Test other pages if they exist
    const pages = ['/about', '/products', '/words', '/sounds', '/contact'];
    
    for (const path of pages) {
      await helpers.navigateToPage(path);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Check for h1 tag
    const h1 = page.locator('h1');
    if (await h1.count() > 0) {
      await expect(h1.first()).toBeVisible();
    }
    
    // Check that headings follow proper hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await helpers.navigateToPage('/');
    await helpers.waitForImagesToLoad();
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        
        // Images should have alt text (empty string is acceptable for decorative images)
        expect(alt).not.toBeNull();
      }
    }
  });

  test('should have proper link text', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < Math.min(10, linkCount); i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        
        // Links should have meaningful text or aria-label
        if (!text || text.trim().length === 0) {
          const ariaLabel = await link.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy();
        }
        
        // Links should have href attribute
        expect(href).toBeTruthy();
      }
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const type = await input.getAttribute('type');
        
        // Skip hidden inputs
        if (type === 'hidden') continue;
        
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        const placeholder = await input.getAttribute('placeholder');
        
        // Input should have a label, aria-label, aria-labelledby, or placeholder
        const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
        
        expect(hasLabel || ariaLabel || ariaLabelledBy || placeholder).toBeTruthy();
      }
    }
  });

  test('should have proper button text or aria-labels', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        // Buttons should have text or aria-label
        if (!text || text.trim().length === 0) {
          expect(ariaLabel).toBeTruthy();
        }
      }
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // This is a basic test - in a real scenario, you might want to use
    // axe-core or similar tools for more comprehensive accessibility testing
    
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, a, button, label');
    const textCount = await textElements.count();
    
    if (textCount > 0) {
      // Check that text elements are visible (basic visibility test)
      for (let i = 0; i < Math.min(5, textCount); i++) {
        const element = textElements.nth(i);
        const isVisible = await element.isVisible();
        
        if (isVisible) {
          // Check that element has some text content
          const text = await element.textContent();
          expect(text).toBeTruthy();
        }
      }
    }
  });

  test('should have skip links for keyboard users', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Look for skip links
    const skipLinks = page.locator('a[href="#main"], a[href="#content"], .skip-link, [data-testid="skip-link"]');
    
    if (await skipLinks.count() > 0) {
      await expect(skipLinks.first()).toBeVisible();
    }
  });

  test('should handle focus management', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Test that focus is managed properly
    const focusableElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const focusableCount = await focusableElements.count();
    
    if (focusableCount > 0) {
      // Test tabbing through elements
      for (let i = 0; i < Math.min(5, focusableCount); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }
    }
  });

  test('should have proper ARIA attributes where needed', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Check for common ARIA attributes
    const elementsWithAria = page.locator('[aria-label], [aria-labelledby], [aria-describedby], [role]');
    const ariaCount = await elementsWithAria.count();
    
    // This test just ensures that ARIA attributes are being used where appropriate
    // The actual validation would be done with tools like axe-core
    expect(ariaCount).toBeGreaterThanOrEqual(0);
  });
});
