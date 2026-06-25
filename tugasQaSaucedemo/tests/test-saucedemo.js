const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Test", function () {
  let driver;
  it("Sukses Login dengan kredensial yang valid", async function () {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://www.saucedemo.com");

    let inputUsername = await driver.findElement(
      By.css('[data-test="username"]'),
    );
    let inputPassword = await driver.findElement(
      By.xpath('//*[@data-test="password"]'),
    );
    let buttonLogin = await driver.findElement(
      By.className("submit-button btn_action"),
    );

    await inputUsername.sendKeys("standard_user");
    await inputPassword.sendKeys("secret_sauce");
    await buttonLogin.click();

    await driver.wait(until.elementLocated(By.css(".inventory_list")), 10000);

    let title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");

    let inventoryList = await driver.findElement(By.css(".inventory_list"));
    await inventoryList.isDisplayed();
  });

  it("Urutkan produk dari A sampai Z", async function () {
    let dropdownSort = await driver.findElement(
      By.css('[data-test="product-sort-container"]'),
    );
    await dropdownSort.click();

    let optionAZ = await driver.findElement(
      By.css('[data-test="product-sort-container"] option[value="az"]'),
    );
    await optionAZ.click();

    await driver.sleep(1000);

    let firstProductName = await driver.findElement(
      By.css('[data-test="inventory-item-name"]'),
    );

    let namaProduct = await firstProductName.getText();
    assert.strictEqual(namaProduct, "Sauce Labs Backpack");

    await firstProductName.isDisplayed();

    await driver.quit();
  });
});
