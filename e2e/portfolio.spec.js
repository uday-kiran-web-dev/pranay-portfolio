import { test, expect } from '@playwright/test';

test.describe('Pranay Kumar Video Editor Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation menu with PRANAY KUMAR, Work, About, Experience, Services, Contact, and Let\'s Work without reel button', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.getByText('PRANAY KUMAR')).toBeVisible();
    await expect(header.getByText('REC')).toBeVisible();
    await expect(header.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Experience', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
    await expect(header.getByRole('link', { name: /Let's Work/i }).first()).toBeVisible();

    // Confirm Reel button is removed
    await expect(header.getByRole('button', { name: /Reel/i })).not.toBeVisible();
  });

  test('should display personal hero section with Pranay Kumar and verified metrics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Sculpting Kinetic Energy/i })).toBeVisible();
    await expect(page.getByText('Hi, I’m Pranay Kumar.')).toBeVisible();
    await expect(page.getByText('40+').first()).toBeVisible();
    await expect(page.getByText('Karimnagar').first()).toBeVisible();
  });

  test('should filter separate client projects in Work section and open Case Study modal for distinct clients', async ({ page }) => {
    const projectsSection = page.locator('#work');
    await projectsSection.scrollIntoViewIfNeeded();

    // Verify distinct separate client cards
    await expect(projectsSection.getByText('FLIPKART BIG DIWALI SALE')).toBeVisible();
    await expect(projectsSection.getByText('AUDIO ODYSSEY STORIES')).toBeVisible();

    // Open Case Study modal for Flipkart
    const projectCard = page.getByTestId('project-card-flipkart-ecommerce');
    await projectCard.click();

    const caseStudyModal = page.getByRole('dialog');
    await expect(caseStudyModal).toBeVisible();
    await expect(caseStudyModal.getByText('FLIPKART BIG DIWALI SALE — Flipkart')).toBeVisible();
    await expect(caseStudyModal.getByText(/Editorial Vision & Narrative Strategy/i)).toBeVisible();

    const closeBtn = page.getByRole('button', { name: /Close Case Study/i });
    await closeBtn.click();
    await expect(caseStudyModal).not.toBeVisible();
  });

  test('should render Statistics, About with Pranay Kumar, Experience, and Services without color grading', async ({ page }) => {
    const statsSection = page.locator('#stats');
    await statsSection.scrollIntoViewIfNeeded();
    await expect(statsSection.getByText('40+')).toBeVisible();
    await expect(statsSection.getByText(/More Stories/i)).toBeVisible();

    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /A Visual Storyteller at Heart/i })).toBeVisible();
    await expect(aboutSection.getByText('PRANAY KUMAR.')).toBeVisible();
    await expect(aboutSection.getByText('FILMYFOCUS | LOPPLY | Tamada Media Pvt. Ltd.')).toBeVisible();
    await expect(aboutSection.getByText('Independent Client Collaborations')).toBeVisible();

    const servicesSection = page.locator('#services');
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /Specialized Services/i })).toBeVisible();
    await expect(servicesSection.getByText('VIDEO EDITING')).toBeVisible();
    await expect(servicesSection.getByText('MOTION GRAPHICS & VFX')).toBeVisible();
    await expect(servicesSection.getByText('GRAPHIC DESIGN & ASSETS')).toBeVisible();
  });

  test('should open contact modal, fill video brief, and submit inquiry to Pranay Kumar', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /LET'S WORK/i })).toBeVisible();

    const getInTouchBtn = contactSection.getByRole('button', { name: /Get In Touch/i });
    await getInTouchBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/CONTACT PRANAY KUMAR \/\//i)).toBeVisible();

    await page.fill('input[placeholder*="Brand Producer"]', 'Director Vikramaditya');
    await page.fill('input[placeholder="producer@agency.com"]', 'vikram@cinema.com');
    await page.fill('textarea[placeholder*="Describe your vision"]', 'Looking for an energetic commercial teaser edit with dynamic pacing.');

    const submitBtn = page.getByRole('button', { name: /Send Video Brief/i });
    await submitBtn.click();

    await expect(page.getByText(/Project Inquiry Received/i)).toBeVisible({ timeout: 10000 });
  });
});
