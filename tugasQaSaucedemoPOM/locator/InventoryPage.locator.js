const LocatorHelper = require("./LocatorHelper");

class InventoryPageLocator {
  inventoryList = LocatorHelper.css(".inventory_list");

  addBackpack = LocatorHelper.css(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  );

  cartButton = LocatorHelper.css(".shopping_cart_link");

  checkoutButton = LocatorHelper.css('[data-test="checkout"]');
}

module.exports = InventoryPageLocator;
