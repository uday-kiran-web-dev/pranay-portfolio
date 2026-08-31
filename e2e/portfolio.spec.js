import { test, expect } from '@playwright/test';

test.describe('Pranay Video Editor Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display personal hero section, brand, and live timecode indicator', async ({ page }) => {
    await expect(page.locator('header').getByText('PRANAY', { exact: true })).toBeVisible();
    await expect(page.locator('header').getByText('REC', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Sculpting Kinetic Energy/i })).toBeVisible();
    await expect(page.getByText('40+').first()).toBeVisible();
  });

  test('should open and close the 2025 Showreel modal', async ({ page }) => {
    // Click Watch 2025 Showreel CTA
    const showreelBtn = page.getByRole('button', { name: 'Watch 2025 Showreel' }).first();
    await showreelBtn.click();

    // Verify modal is open
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/SHOWREEL MASTER/i)).toBeVisible();

    // Switch chapter
    const cyberpunkBtn = page.getByRole('button', { name: /Cyberpunk VFX/i });
    await cyberpunkBtn.click();

    // Close modal
    const closeBtn = page.getByRole('button', { name: /Close Showreel modal/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should interact with Color Grading presets and bypass toggle', async ({ page }) => {
    // Scroll down to color grading section
    const colorSection = page.locator('#color-grading');
    await colorSection.scrollIntoViewIfNeeded();

    await expect(page.getByRole('heading', { name: /Color Grading & Film Emulation/i })).toBeVisible();

    // Switch to Neo-Tokyo preset
    const neoTokyoPreset = colorSection.getByRole('button', { name: /Neo-Tokyo Teal & Amber/i });
    await neoTokyoPreset.click();
    await expect(page.getByText('DaVinci Wide Gamut Intermediate')).toBeVisible();

    // Switch scopes tab
    const rgbTab = colorSection.getByRole('button', { name: 'RGB Parade' });
    await rgbTab.click();

    // Click bypass button
    const bypassBtn = colorSection.getByRole('button', { name: /GRADED COLOR PASS/i });
    await bypassBtn.click();
    await expect(page.getByText(/BYPASS ACTIVE/i)).toBeVisible();
  });

  test('should filter projects in Bento mode and open Case Study modal', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();

    // Click Entertainment filter
    const entertainmentFilter = projectsSection.getByRole('button', { name: 'Entertainment', exact: true });
    await entertainmentFilter.click();

    await expect(projectsSection.getByText('ENTERTAINMENT INSIDER')).toBeVisible();
    await expect(projectsSection.getByText('FLIPKART BIG DIWALI SALE')).not.toBeVisible();

    // Reset to All projects filter
    const allFilter = projectsSection.getByRole('button', { name: 'All', exact: true });
    await allFilter.click();
    await expect(projectsSection.getByText('FLIPKART BIG DIWALI SALE')).toBeVisible();

    // Open Case Study modal
    const projectCard = page.getByTestId('project-card-flipkart-ecommerce');
    await projectCard.click();

    const caseStudyModal = page.getByRole('dialog');
    await expect(caseStudyModal).toBeVisible();
    await expect(page.getByText(/Editorial Vision & Narrative Strategy/i)).toBeVisible();

    // Close Case Study
    const closeBtn = page.getByRole('button', { name: /Close Case Study/i });
    await closeBtn.click();
    await expect(caseStudyModal).not.toBeVisible();
  });

  test('should interact with Stems Audio Mixer and Solo controls', async ({ page }) => {
    const mixerSection = page.locator('#sound-mixer');
    await mixerSection.scrollIntoViewIfNeeded();

    await expect(page.getByRole('heading', { name: /Sound Design & Foley Mixer/i })).toBeVisible();

    // Click Solo on Foley stem
    const soloBtn = mixerSection.getByRole('button', { name: /Solo Foley & Tactical SFX/i });
    await soloBtn.click();
    await expect(page.getByText('SOLO ON')).toBeVisible();
  });

  test('should use Project Estimator and submit inquiry modal with validation', async ({ page }) => {
    const pricingSection = page.locator('#pricing');
    await pricingSection.scrollIntoViewIfNeeded();

    await expect(page.getByRole('heading', { name: /Interactive Rate & Scope Calculator/i })).toBeVisible();

    // Select Narrative Short in pricing section
    const narrativeBtn = pricingSection.getByRole('button', { name: /Narrative Short/i });
    await narrativeBtn.click();

    // Click Inquire button
    const inquireBtn = pricingSection.getByRole('button', { name: /Inquire With These Specs/i });
    await inquireBtn.click();

    // Verify Contact Modal is opened with pre-filled details
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/CONTACT PRANAY \/\//i)).toBeVisible();

    // Fill form
    await page.fill('input[placeholder*="Brand Producer"]', 'Director S.S. Rajamouli');
    await page.fill('input[placeholder="producer@agency.com"]', 'rajamouli@filmmakers.com');
    await page.fill('textarea[placeholder*="Describe your vision"]', 'Looking for an epic action teaser edit with dynamic pacing and custom motion design.');

    // Submit form
    const submitBtn = page.getByRole('button', { name: /Send Video Brief/i });
    await submitBtn.click();

    // Verify success state
    await expect(page.getByText(/Project Inquiry Received/i)).toBeVisible({ timeout: 10000 });
  });
});
