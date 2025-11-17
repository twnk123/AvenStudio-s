const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function visualVerify() {
  console.log('Starting visual verification with Puppeteer...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const pagesToCheck = [
    { name: 'Services Page', path: 'services/page.html' },
    { name: 'About Page', path: 'about/page.html' },
    { name: 'Projects Page', path: 'projects/page.html' },
    { name: 'Pricing Page', path: 'pricing/page.html' },
    { name: 'Contact Page', path: 'contact/page.html' }
  ];

  for (const pageInfo of pagesToCheck) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Checking: ${pageInfo.name}`);
    console.log('='.repeat(60));

    const sourcePath = `file:///${path.join(__dirname, '..', 'New folder', pageInfo.path).replace(/\\/g, '/')}`;
    const targetPath = `file:///${path.join(__dirname, pageInfo.path).replace(/\\/g, '/')}`;

    // Create two pages side by side
    const sourcePage = await browser.newPage();
    const targetPage = await browser.newPage();

    try {
      // Load source page
      console.log('\nLoading SOURCE (New folder)...');
      await sourcePage.goto(sourcePath, { waitUntil: 'networkidle0', timeout: 30000 });
      await sourcePage.waitForTimeout(3000); // Wait for animations
      console.log('✓ Source loaded');

      // Load target page
      console.log('Loading TARGET (new_product_idea)...');
      await targetPage.goto(targetPath, { waitUntil: 'networkidle0', timeout: 30000 });
      await targetPage.waitForTimeout(3000); // Wait for animations
      console.log('✓ Target loaded');

      // Get page heights
      const sourceHeight = await sourcePage.evaluate(() => document.documentElement.scrollHeight);
      const targetHeight = await targetPage.evaluate(() => document.documentElement.scrollHeight);

      console.log(`\nPage heights:`);
      console.log(`  Source: ${sourceHeight}px`);
      console.log(`  Target: ${targetHeight}px`);

      if (Math.abs(sourceHeight - targetHeight) < 10) {
        console.log('  ✓ Heights match (within 10px tolerance)');
      } else {
        console.log('  ⚠ Heights differ');
      }

      // Check for animations
      const sourceAnimations = await sourcePage.evaluate(() => {
        return document.querySelectorAll('[style*="animation"], [class*="animate"]').length;
      });

      const targetAnimations = await targetPage.evaluate(() => {
        return document.querySelectorAll('[style*="animation"], [class*="animate"]').length;
      });

      console.log(`\nAnimation elements:`);
      console.log(`  Source: ${sourceAnimations}`);
      console.log(`  Target: ${targetAnimations}`);

      if (sourceAnimations === targetAnimations) {
        console.log('  ✓ Same number of animated elements');
      } else {
        console.log('  ⚠ Different number of animated elements');
      }

      // Take screenshots for visual comparison
      const screenshotsDir = path.join(__dirname, 'verification-screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const safeName = pageInfo.path.replace(/\//g, '-').replace('.html', '');
      await sourcePage.screenshot({
        path: path.join(screenshotsDir, `${safeName}-source.png`),
        fullPage: true
      });
      await targetPage.screenshot({
        path: path.join(screenshotsDir, `${safeName}-target.png`),
        fullPage: true
      });

      console.log(`\n✓ Screenshots saved to: verification-screenshots/`);

    } catch (error) {
      console.error(`✗ Error checking ${pageInfo.name}:`, error.message);
    }

    await sourcePage.close();
    await targetPage.close();
  }

  console.log('\n' + '='.repeat(60));
  console.log('Visual verification complete!');
  console.log('='.repeat(60));
  console.log('\nScreenshots have been saved for manual comparison.');
  console.log('Browser will close in 5 seconds...');

  await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
}

visualVerify().catch(console.error);
