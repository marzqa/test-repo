import { test, expect } from "@playwright/test";


test.describe("Simple ui test", () => {
  test("check api response", async ({ page }) => {
    // Arrange:
    const buttonSelector = '#id-button-element';
    const buttonLocator = page.locator(buttonSelector);
    const resultsSelector = '#results';
    const resultsLocator = page.locator(resultsSelector);
    // Provide a self-contained HTML page so the test does not depend on a web server
    await page.setContent(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Simple elements</title>
        </head>
        <body>
          <button id="id-button-element">Click me</button>
          <div id="results"></div>
          <script>
            document.getElementById('id-button-element').addEventListener('click', function() {
              document.getElementById('results').textContent = 'You clicked the button!';
            });
          </script>
        </body>
      </html>
    `);


    // Act: interact with UI element
    await buttonLocator.click();


    // Assert:
    await expect(resultsLocator).toHaveText('You clicked the button!');
  });
});