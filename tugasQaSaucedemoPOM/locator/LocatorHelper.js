const { By } = require("selenium-webdriver");

class LocatorHelper {
  static id(value) {
    return By.id(value);
  }

  static css(value) {
    return By.css(value);
  }

  static xpath(value) {
    return By.xpath(value);
  }

  static className(value) {
    return By.className(value);
  }

  static name(value) {
    return By.name(value);
  }
}

module.exports = LocatorHelper;
