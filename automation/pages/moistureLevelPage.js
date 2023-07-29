const { expect } = require("@playwright/test");

exports.MoistureLevelPage = class MoistureLevelPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.formSoilType = page.locator("#formSoilType");
    this.formMoistureLevel = page.locator("#formMoistureLevel");
    this.btnSubmit = page.locator(".btn-submit", { hasText: "Obter conselho" });
    this.adviceText = page.locator(".advice-text");
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickBtnSubmit() {
    await this.btnSubmit.click();
  }

  async selectSoilType(soilType) {
    await this.formSoilType.selectOption(soilType);
  }

  async setMoistureLevel(moistureLevel) {
    await this.formMoistureLevel.type(moistureLevel.toString(), { delay: 100 });
  }
};
