const InventoryPageLocator = require("../locator/InventoryPage.locator");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.locator = new InventoryPageLocator();
  }

  async addBackpackToCart() {
    const button = await this.driver.findElement(this.locator.addBackpack);
    await button.click();
  }

  async openCart() {
    const cart = await this.driver.findElement(this.locator.cartButton);
    await cart.click();
  }

  async clickCheckout() {
    const checkout = await this.driver.findElement(this.locator.checkoutButton);
    await checkout.click();
  }
}

module.exports = InventoryPage;
