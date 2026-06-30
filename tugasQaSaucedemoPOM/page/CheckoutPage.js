const CheckoutPageLocator = require("../locator/CheckoutPage.locator");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.locator = new CheckoutPageLocator();
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.driver.findElement(this.locator.firstName).sendKeys(firstName);

    await this.driver.findElement(this.locator.lastName).sendKeys(lastName);

    await this.driver.findElement(this.locator.postalCode).sendKeys(postalCode);
  }

  async continueCheckout() {
    await this.driver.findElement(this.locator.continueButton).click();
  }

  async finishCheckout() {
    await this.driver.findElement(this.locator.finishButton).click();
  }

  async getCompleteHeader() {
    const element = await this.driver.findElement(this.locator.completeHeader);

    return await element.getText();
  }
}

module.exports = CheckoutPage;
