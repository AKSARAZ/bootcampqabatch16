const { until, Key } = require("selenium-webdriver");

const LoginPageLocator = require("../locator/LoginPage.locator");
const InventoryPageLocator = require("../locator/InventoryPage.locator");

class LoginPage {
  constructor(driver) {
    this.driver = driver;

    this.locator = new LoginPageLocator();

    this.inventoryLocator = new InventoryPageLocator();
  }

  async openWebsite() {
    await this.driver.get("https://www.saucedemo.com/");
  }

  async inputUsername(username) {
    const element = await this.driver.findElement(this.locator.username);

    await element.sendKeys(Key.CONTROL, "a");
    await element.sendKeys(Key.DELETE);
    await element.sendKeys(username);
  }

  async inputPassword(password) {
    const element = await this.driver.findElement(this.locator.password);

    await element.sendKeys(Key.CONTROL, "a");
    await element.sendKeys(Key.DELETE);
    await element.sendKeys(password);
  }

  async clickLogin() {
    await this.driver.findElement(this.locator.loginButton).click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLogin();
  }

  async waitUntilInventoryLoaded() {
    await this.driver.wait(
      until.elementLocated(this.inventoryLocator.inventoryList),
      10000,
    );
  }

  async getErrorMessage() {
    await this.driver.wait(
      until.elementLocated(this.locator.errorMessage),
      10000,
    );
    return await this.driver.findElement(this.locator.errorMessage).getText();
  }
}

module.exports = LoginPage;
