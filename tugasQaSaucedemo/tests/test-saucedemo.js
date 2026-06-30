const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Test", function () {
  let driver;

  // Dijalankan sekali sebelum seluruh test dimulai
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    console.log("Browser berhasil dibuka");
  });

  // Dijalankan sebelum setiap test case
  beforeEach(async function () {
    console.log("Memulai test case: " + this.currentTest.title);
  });

  // Dijalankan setelah setiap test case
  afterEach(async function () {
    console.log("Selesai test case: " + this.currentTest.title);
  });

  // Dijalankan sekali setelah seluruh test selesai
  after(async function () {
    await driver.quit();
    console.log("Browser berhasil ditutup");
  });

  it("Sukses Login dengan kredensial yang valid", async function () {
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
  });
});
