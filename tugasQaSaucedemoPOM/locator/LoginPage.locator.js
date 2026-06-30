const LocatorHelper = require("./LocatorHelper");

class LoginPageLocator {
  username = LocatorHelper.css('[data-test="username"]');

  password = LocatorHelper.css('[data-test="password"]');

  loginButton = LocatorHelper.css('[data-test="login-button"]');

  errorMessage = LocatorHelper.css('[data-test="error"]');
}

module.exports = LoginPageLocator;
