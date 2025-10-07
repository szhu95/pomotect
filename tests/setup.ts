import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps here if needed
  // For now, we'll just navigate to the home page to ensure the app is running
  await page.goto('/');
  await expect(page).toHaveTitle(/postmodern tectonics/);
  
  // Wait for the splash screen to disappear
  await page.waitForSelector('[data-testid="splash-screen"]', { state: 'hidden', timeout: 10000 });
  
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
