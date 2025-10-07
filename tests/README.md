# End-to-End Tests

This directory contains end-to-end (E2E) tests for the postmodern tectonics website using Playwright.

## Test Structure

- `homepage.spec.ts` - Tests for the homepage functionality
- `navigation.spec.ts` - Tests for site navigation and routing
- `products.spec.ts` - Tests for product pages and e-commerce functionality
- `words.spec.ts` - Tests for the blog/articles section
- `forms.spec.ts` - Tests for all forms (newsletter, contact, RSVP, etc.)
- `accessibility.spec.ts` - Tests for accessibility compliance
- `setup.ts` - Test setup and authentication
- `utils/test-helpers.ts` - Reusable test utilities

## Running Tests

### Prerequisites
1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`

### Commands
- `npm run test:e2e` - Run all tests headlessly
- `npm run test:e2e:ui` - Run tests with UI mode (interactive)
- `npm run test:e2e:debug` - Run tests in debug mode
- `npm run test:e2e:headed` - Run tests with browser visible
- `npm run test:e2e:report` - Show test report

### Test Configuration
Tests are configured to:
- Run against `http://localhost:3000` (automatically starts dev server)
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile viewports
- Take screenshots and videos on failure
- Generate HTML reports

## Writing Tests

### Best Practices
1. Use the `TestHelpers` class for common operations
2. Wait for splash screen to disappear: `await helpers.waitForSplashScreenToDisappear()`
3. Use semantic selectors when possible
4. Handle dynamic content gracefully with conditional checks
5. Test both desktop and mobile viewports

### Example Test
```typescript
import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Feature Name', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToPage('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## Debugging Tests

1. Use `npm run test:e2e:debug` to step through tests
2. Use `npm run test:e2e:ui` for interactive debugging
3. Check the HTML report for detailed failure information
4. Screenshots and videos are saved in `test-results/`

## Continuous Integration

Tests are configured to run in CI environments with:
- Automatic retries on failure
- Single worker to avoid resource conflicts
- Proper timeout handling
- Artifact collection for failures
