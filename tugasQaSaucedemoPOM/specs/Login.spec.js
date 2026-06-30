const { Builder } = require("selenium-webdriver");
const assert = require("assert");

const LoginPage = require("../page/LoginPage");
const InventoryPage = require("../page/InventoryPage");
const CheckoutPage = require("../page/CheckoutPage");
const ScreenshotPage = require("../page/ScreenshotPage");
const VisualRegressionHelper = require("../utilities/VisualRegressionHelper");

describe("Automation Testing SauceDemo dengan POM", function () {
  this.timeout(60000);

  let driver;
  let loginPage;
  let inventoryPage;
  let checkoutPage;
  let screenshotPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    checkoutPage = new CheckoutPage(driver);
    screenshotPage = new ScreenshotPage(driver);
  });

  beforeEach(async function () {
    await driver.manage().deleteAllCookies();
    await loginPage.openWebsite();
    await driver.executeScript(
      "window.localStorage.clear(); window.sessionStorage.clear();",
    );
  });

  after(async function () {
    await driver.quit();
  });

  it("TC01 - Login berhasil", async function () {
    await loginPage.login("standard_user", "secret_sauce");

    await loginPage.waitUntilInventoryLoaded();
    await driver.sleep(1000);

    const title = await driver.getTitle();

    assert.strictEqual(title, "Swag Labs");

    await screenshotPage.takeScreenshot("current", "TC01_Login_Berhasil");

    const visual = VisualRegressionHelper.compareImages("TC01_Login_Berhasil");

    assert.strictEqual(visual, true);
  });

  it("TC02 - Username tidak valid", async function () {
    await loginPage.login("username_salah", "secret_sauce");

    const error = await loginPage.getErrorMessage();

    assert.strictEqual(
      error,
      "Epic sadface: Username and password do not match any user in this service",
    );

    await screenshotPage.takeScreenshot("current", "TC02_Invalid_Username");

    const visual = VisualRegressionHelper.compareImages(
      "TC02_Invalid_Username",
    );

    assert.strictEqual(visual, true);
  });

  it("TC03 - Password salah", async function () {
    await loginPage.login("standard_user", "password_salah");

    const error = await loginPage.getErrorMessage();

    assert.strictEqual(
      error,
      "Epic sadface: Username and password do not match any user in this service",
    );

    await screenshotPage.takeScreenshot("current", "TC03_Wrong_Password");

    const visual = VisualRegressionHelper.compareImages("TC03_Wrong_Password");

    assert.strictEqual(visual, true);
  });

  it("TC04 - Locked Out User", async function () {
    await loginPage.login("locked_out_user", "secret_sauce");

    const error = await loginPage.getErrorMessage();

    assert.strictEqual(
      error,
      "Epic sadface: Sorry, this user has been locked out.",
    );

    await screenshotPage.takeScreenshot("current", "TC04_Locked_User");

    const visual = VisualRegressionHelper.compareImages("TC04_Locked_User");

    assert.strictEqual(visual, true);
  });

  it("TC05 - Login, Add to Cart dan Checkout", async function () {
    await loginPage.login("standard_user", "secret_sauce");

    await loginPage.waitUntilInventoryLoaded();

    await inventoryPage.addBackpackToCart();

    await inventoryPage.openCart();

    await inventoryPage.clickCheckout();

    await checkoutPage.fillCheckoutInformation("Dwiki", "Pratama", "53357");

    await checkoutPage.continueCheckout();

    await checkoutPage.finishCheckout();

    const message = await checkoutPage.getCompleteHeader();

    assert.strictEqual(message, "Thank you for your order!");

    await screenshotPage.takeScreenshot("current", "TC05_Checkout_Berhasil");

    const visual = VisualRegressionHelper.compareImages(
      "TC05_Checkout_Berhasil",
    );

    assert.strictEqual(visual, true);
  });
});
