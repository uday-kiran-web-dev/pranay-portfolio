import { test, expect } from '@playwright/test';

test.describe('Pranay Video Editor Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation menu matching Work, About, Experience, Services, Contact, and Let\'s Work', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.getByText('PRANAY')).toBeVisible();
    await expect(header.getByText('REC')).toBeVisible();
    await expect(header.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Experience', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: /Let's Work/i }).first()).toBeVisible();
  });

  test('should display personal hero section and verified metrics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Sculpting Kinetic Energy/i })).toBeVisible();
    await expect(page.getByText('40+').first()).toBeVisible();
    await expect(page.getByText('Karimnagar').first()).toBeVisible();
  });

  test('should open and close the 2025 Showreel modal', async ({ page }) => {
    const showreelBtn = page.getByRole('button', { name: 'Watch 2025 Showreel' }).first();
    await showreelBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/SHOWREEL MASTER/i)).toBeVisible();

    const cyberpunkBtn = page.getByRole('button', { name: /Cyberpunk VFX/i });
    await cyberpunkBtn.click();

    const closeBtn = page.getByRole('button', { name: /Close Showreel modal/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should filter projects in Work section and open Case Study modal', async ({ page }) => {
    const projectsSection = page.locator('#work');
    await projectsSection.scrollIntoViewIfNeeded();

    const entertainmentFilter = projectsSection.getByRole('button', { name: 'Entertainment', exact: true });
    await entertainmentFilter.click();

    await expect(projectsSection.getByText('ENTERTAINMENT INSIDER')).toBeVisible();
    await expect(projectsSection.getByText('FLIPKART BIG DIWALI SALE')).not.toBeVisible();

    const allFilter = projectsSection.getByRole('button', { name: 'All', exact: true });
    await allFilter.click();
    await expect(projectsSection.getByText('FLIPKART BIG DIWALI SALE')).toBeVisible();

    const projectCard = page.getByTestId('project-card-flipkart-ecommerce');
    await projectCard.click();

    const caseStudyModal = page.getByRole('dialog');
    await expect(caseStudyModal).toBeVisible();
    await expect(page.getByText(/Editorial Vision & Narrative Strategy/i)).toBeVisible();

    const closeBtn = page.getByRole('button', { name: /Close Case Study/i });
    await closeBtn.click();
    await expect(caseStudyModal).not.toBeVisible();
  });

  test('should render Statistics, About, Experience, and Services sections', async ({ page }) => {
    const statsSection = page.locator('#stats');
    await statsSection.scrollIntoViewIfNeeded();
    await expect(statsSection.getByText('40+')).toBeVisible();
    await expect(statsSection.getByText(/More Stories/i)).toBeVisible();

    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /A Visual Storyteller at Heart/i })).toBeVisible();
    await expect(aboutSection.getByText('FILMYFOCUS | LOPPLY | Tamada Media Pvt. Ltd.')).toBeVisible();
    await expect(aboutSection.getByText('Independent Client Collaborations')).toBeVisible();

    const servicesSection = page.locator('#services');
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /Specialized Services/i })).toBeVisible();
    await expect(servicesSection.getByText('VIDEO EDITING')).toBeVisible();
    await expect(servicesSection.getByText('MOTION DESIGN')).toBeVisible();
  });

  test('should open contact modal, fill video brief, and submit inquiry', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /LET'S WORK/i })).toBeVisible();

    const getInTouchBtn = contactSection.getByRole('button', { name: /Get In Touch/i });
    await getInTouchBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/CONTACT PRANAY \/\//i)).toBeVisible();

    await page.fill('input[placeholder*="Brand Producer"]', 'Director Vikramaditya');
    await page.fill('input[placeholder="producer@agency.com"]', 'vikram@cinema.com');
    await page.fill('textarea[placeholder*="Describe your vision"]', 'Looking for an energetic commercial teaser edit with dynamic pacing.');

    const submitBtn = page.getByRole('button', { name: /Send Video Brief/i });
    await submitBtn.click();

    await expect(page.getByText(/Project Inquiry Received/i)).toBeVisible({ timeout: 10000 });
  });
});
