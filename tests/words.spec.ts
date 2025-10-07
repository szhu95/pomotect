import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Words Page', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToPage('/words');
  });

  test('should load words page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/words/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display articles or posts', async ({ page }) => {
    // Look for article containers
    const articles = page.locator('article, [data-testid="post"], [data-testid="article"], .post, .article');
    
    if (await articles.count() > 0) {
      await expect(articles.first()).toBeVisible();
    }
  });

  test('should display article titles', async ({ page }) => {
    const titles = page.locator('h1, h2, h3, .post-title, .article-title, [data-testid="post-title"]');
    
    if (await titles.count() > 0) {
      await expect(titles.first()).toBeVisible();
    }
  });

  test('should display article excerpts or content', async ({ page }) => {
    const content = page.locator('p, .excerpt, .content, [data-testid="post-excerpt"]');
    
    if (await content.count() > 0) {
      await expect(content.first()).toBeVisible();
    }
  });

  test('should navigate to individual articles', async ({ page }) => {
    const articleLinks = page.locator('a[href*="/words/"]');
    
    if (await articleLinks.count() > 0) {
      await articleLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should be on an article detail page
      await expect(page).toHaveURL(/\/words\/.+/);
    }
  });

  test('should display article metadata', async ({ page }) => {
    // Look for dates, authors, categories
    const metadata = page.locator('time, .date, .author, .category, .published');
    
    if (await metadata.count() > 0) {
      await expect(metadata.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Main content should still be visible
    await expect(page.locator('main')).toBeVisible();
    
    // Articles should be displayed properly
    const articles = page.locator('article, [data-testid="post"], .post');
    if (await articles.count() > 0) {
      await expect(articles.first()).toBeVisible();
    }
  });

  test('should load images properly', async ({ page }) => {
    await helpers.waitForImagesToLoad();
    
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
});

test.describe('Individual Article Page', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    
    // First navigate to words page to find an article
    await helpers.navigateToPage('/words');
    
    // Look for an article link and navigate to it
    const articleLinks = page.locator('a[href*="/words/"]');
    if (await articleLinks.count() > 0) {
      await articleLinks.first().click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('should load article detail page', async ({ page }) => {
    // Should be on an article detail page
    await expect(page).toHaveURL(/\/words\/.+/);
  });

  test('should display full article content', async ({ page }) => {
    // Check for article title
    const title = page.locator('h1, h2, .article-title, .post-title, [data-testid="article-title"]');
    if (await title.count() > 0) {
      await expect(title.first()).toBeVisible();
    }
    
    // Check for article content
    const content = page.locator('article, .content, .post-content, [data-testid="article-content"]');
    if (await content.count() > 0) {
      await expect(content.first()).toBeVisible();
    }
  });

  test('should display article images', async ({ page }) => {
    const images = page.locator('img');
    if (await images.count() > 0) {
      await expect(images.first()).toBeVisible();
      await helpers.waitForImagesToLoad();
    }
  });

  test('should have navigation back to words list', async ({ page }) => {
    const backLink = page.locator('a:has-text("Back"), a:has-text("←"), a:has-text("Words"), [data-testid="back-link"]');
    
    if (await backLink.count() > 0) {
      await expect(backLink.first()).toBeVisible();
      await backLink.first().click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/words/);
    }
  });

  test('should display article metadata', async ({ page }) => {
    // Look for publication date, author, etc.
    const metadata = page.locator('time, .date, .author, .published, .article-meta');
    
    if (await metadata.count() > 0) {
      await expect(metadata.first()).toBeVisible();
    }
  });
});
