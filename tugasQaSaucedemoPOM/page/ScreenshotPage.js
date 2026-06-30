const fs = require("fs");
const path = require("path");

class ScreenshotPage {
  constructor(driver) {
    this.driver = driver;
  }

  async takeScreenshot(folder, fileName) {
    const image = await this.driver.takeScreenshot();

    const directory = path.join(__dirname, "..", "screenshots", folder);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(path.join(directory, `${fileName}.png`), image, "base64");
  }
}

module.exports = ScreenshotPage;
