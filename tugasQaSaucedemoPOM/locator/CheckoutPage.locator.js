const LocatorHelper = require("./LocatorHelper");

class CheckoutPageLocator {
  firstName = LocatorHelper.css('[data-test="firstName"]');
  lastName = LocatorHelper.css('[data-test="lastName"]');
  postalCode = LocatorHelper.css('[data-test="postalCode"]');
  continueButton = LocatorHelper.css('[data-test="continue"]');
  finishButton = LocatorHelper.css('[data-test="finish"]');
  completeHeader = LocatorHelper.css(".complete-header");
}

module.exports = CheckoutPageLocator;
