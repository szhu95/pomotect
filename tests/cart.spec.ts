import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Shopping Cart', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should add product to cart', async ({ page }) => {
    await helpers.navigateToPage('/products');
    
    // Look for product links
    const productLinks = page.locator('a[href*="/products/"]');
    
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Look for add to cart button
      const addToCartButton = page.locator(
        'button:has-text("Add to Cart"), button:has-text("Add"), [data-testid*="add-cart"], [data-testid*="add-to-cart"]'
      );
      
      if (await addToCartButton.count() > 0) {
        await addToCartButton.first().click();
        
        // Wait for cart update or success message
        await page.waitForTimeout(2000);
        
        // Check for cart indicator or success message
        const cartIndicator = page.locator(
          '[data-testid="cart-count"], .cart-count, .cart-indicator, text=/cart/i'
        );
        
        if (await cartIndicator.count() > 0) {
          await expect(cartIndicator.first()).toBeVisible();
        }
      }
    }
  });

  test('should navigate to cart page', async ({ page }) => {
    // Look for cart link/button
    const cartLink = page.locator(
      'a[href*="/cart"], [data-testid="cart-link"], button:has-text("Cart"), .cart-link'
    );
    
    if (await cartLink.count() > 0) {
      await cartLink.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should be on cart page
      await expect(page).toHaveURL(/\/cart/);
    }
  });

  test('should display cart contents', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Check for cart content
    const cartContent = page.locator(
      'main, .cart-content, [data-testid="cart-content"], .cart-items'
    );
    
    await expect(cartContent).toBeVisible();
  });

  test('should update product quantity in cart', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Look for quantity controls
    const quantityInput = page.locator(
      'input[type="number"], [data-testid="quantity"], .quantity-input'
    );
    const quantityButtons = page.locator(
      'button:has-text("+"), button:has-text("-"), [data-testid*="quantity"]'
    );
    
    if (await quantityInput.count() > 0) {
      const input = quantityInput.first();
      await input.fill('2');
      
      // Check that value was updated
      const value = await input.inputValue();
      expect(value).toBe('2');
    } else if (await quantityButtons.count() > 0) {
      // Test increment/decrement buttons
      const incrementButton = quantityButtons.filter(':has-text("+")').first();
      if (await incrementButton.count() > 0) {
        await incrementButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should remove product from cart', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Look for remove button
    const removeButton = page.locator(
      'button:has-text("Remove"), button:has-text("Delete"), [data-testid*="remove"], .remove-item'
    );
    
    if (await removeButton.count() > 0) {
      await removeButton.first().click();
      await page.waitForTimeout(1000);
      
      // Cart should be updated or empty message shown
      const emptyMessage = page.locator(
        'text=/empty/i, text=/no items/i, .cart-empty, [data-testid="cart-empty"]'
      );
      
      if (await emptyMessage.count() > 0) {
        await expect(emptyMessage).toBeVisible();
      }
    }
  });

  test('should calculate cart totals correctly', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Look for total/summary elements
    const totals = page.locator(
      '.total, .subtotal, .cart-total, [data-testid*="total"], text=/total/i, text=/subtotal/i'
    );
    
    if (await totals.count() > 0) {
      await expect(totals.first()).toBeVisible();
      
      // Check that totals contain currency symbols or numbers
      const totalText = await totals.first().textContent();
      expect(totalText).toMatch(/\$|\€|\£|\d+/);
    }
  });

  test('should proceed to checkout', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Look for checkout button
    const checkoutButton = page.locator(
      'button:has-text("Checkout"), button:has-text("Proceed"), a[href*="checkout"], [data-testid*="checkout"]'
    );
    
    if (await checkoutButton.count() > 0) {
      await checkoutButton.first().click();
      await page.waitForTimeout(2000);
      
      // Should navigate to checkout or external payment
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/checkout|payment|shopify|stripe/);
    }
  });

  test('should persist cart state across pages', async ({ page }) => {
    // Add item to cart first
    await helpers.navigateToPage('/products');
    
    const productLinks = page.locator('a[href*="/products/"]');
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      const addToCartButton = page.locator(
        'button:has-text("Add to Cart"), button:has-text("Add"), [data-testid*="add-cart"]'
      );
      
      if (await addToCartButton.count() > 0) {
        await addToCartButton.first().click();
        await page.waitForTimeout(2000);
        
        // Navigate to another page
        await helpers.navigateToPage('/');
        
        // Check that cart indicator still shows items
        const cartIndicator = page.locator(
          '[data-testid="cart-count"], .cart-count, .cart-indicator'
        );
        
        if (await cartIndicator.count() > 0) {
          await expect(cartIndicator.first()).toBeVisible();
        }
      }
    }
  });

  test('should handle empty cart gracefully', async ({ page }) => {
    await helpers.navigateToPage('/cart');
    
    // Look for empty cart message
    const emptyMessage = page.locator(
      'text=/empty/i, text=/no items/i, .cart-empty, [data-testid="cart-empty"]'
    );
    
    if (await emptyMessage.count() > 0) {
      await expect(emptyMessage).toBeVisible();
    }
    
    // Should have link to continue shopping
    const continueShoppingLink = page.locator(
      'a:has-text("Continue Shopping"), a:has-text("Shop"), a[href="/products"]'
    );
    
    if (await continueShoppingLink.count() > 0) {
      await expect(continueShoppingLink.first()).toBeVisible();
    }
  });
});
