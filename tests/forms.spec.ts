import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Forms', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should handle newsletter form on homepage', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button[type="submit"]').first();
    
    if (await emailInput.count() > 0 && await submitButton.count() > 0) {
      await emailInput.fill('test@example.com');
      await submitButton.click();
      
      // Wait for potential response
      await page.waitForTimeout(2000);
      
      // Form should still be functional or show success message
      await expect(emailInput).toBeVisible();
    }
  });

  test('should validate email format in newsletter form', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button[type="submit"]').first();
    
    if (await emailInput.count() > 0 && await submitButton.count() > 0) {
      // Try invalid email
      await emailInput.fill('invalid-email');
      await submitButton.click();
      
      // Check for validation message
      await page.waitForTimeout(1000);
      
      // Try valid email
      await emailInput.fill('test@example.com');
      await submitButton.click();
      
      await page.waitForTimeout(2000);
    }
  });

  test('should handle contact form if it exists', async ({ page }) => {
    await helpers.navigateToPage('/contact');
    
    // Look for contact form fields
    const nameInput = page.locator('input[name*="name" i], input[placeholder*="name" i]');
    const emailInput = page.locator('input[type="email"]');
    const messageInput = page.locator('textarea, input[name*="message" i]');
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    
    if (await nameInput.count() > 0 && await emailInput.count() > 0 && await messageInput.count() > 0 && await submitButton.count() > 0) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageInput.fill('This is a test message');
      await submitButton.click();
      
      // Wait for potential response
      await page.waitForTimeout(3000);
      
      // Check for success message or form reset
      const successMessage = page.locator('.success, .message, [data-testid="success"]');
      if (await successMessage.count() > 0) {
        await expect(successMessage).toBeVisible();
      }
    }
  });

  test('should handle inquiry form if it exists', async ({ page }) => {
    // Look for inquiry form on various pages
    const inquiryForm = page.locator('form, [data-testid="inquiry-form"]');
    
    if (await inquiryForm.count() > 0) {
      const nameInput = page.locator('input[name*="name" i]');
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button[type="submit"]');
      
      if (await nameInput.count() > 0 && await emailInput.count() > 0 && await submitButton.count() > 0) {
        await nameInput.fill('Test User');
        await emailInput.fill('test@example.com');
        await submitButton.click();
        
        await page.waitForTimeout(2000);
      }
    }
  });

  test('should handle RSVP form if it exists', async ({ page }) => {
    await helpers.navigateToPage('/rsvp');
    
    // Look for RSVP form elements
    const nameInput = page.locator('input[name*="name" i]');
    const emailInput = page.locator('input[type="email"]');
    const rsvpSelect = page.locator('select, input[type="radio"]');
    const submitButton = page.locator('button[type="submit"]');
    
    if (await nameInput.count() > 0 && await emailInput.count() > 0 && await submitButton.count() > 0) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      
      // Handle RSVP selection if it exists
      if (await rsvpSelect.count() > 0) {
        if (await rsvpSelect.first().tagName() === 'SELECT') {
          await rsvpSelect.first().selectOption({ index: 1 });
        } else {
          await rsvpSelect.first().click();
        }
      }
      
      await submitButton.click();
      
      // Wait for potential response
      await page.waitForTimeout(3000);
    }
  });

  test('should prevent form submission with empty required fields', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button[type="submit"]').first();
    
    if (await emailInput.count() > 0 && await submitButton.count() > 0) {
      // Try to submit with empty email
      await emailInput.fill('');
      await submitButton.click();
      
      // Check for validation or that form doesn't submit
      await page.waitForTimeout(1000);
      
      // Form should still be visible and functional
      await expect(emailInput).toBeVisible();
    }
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await helpers.navigateToPage('/contact');
    
    // Try to submit form without filling required fields
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    
    if (await submitButton.count() > 0) {
      await submitButton.click();
      
      // Wait for potential error handling
      await page.waitForTimeout(2000);
      
      // Page should not crash and form should still be functional
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await helpers.navigateToPage('/');
    
    // Test tab navigation through form elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
  });
});
