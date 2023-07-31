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

    this.soilConfigs = {
      thin: { lower: 60, upper: 80 },
      mid: { lower: 70, upper: 88 },
      rough: { lower: 80, upper: 90 },
    };
    this.soilTypes = {
      thin: "thin",
      mid: "mid",
      rough: "rough",
    };
    this.soilMoistureLimits = {
      max: 100,
      min: 0,
    };
    this.adviceMessages = {
      selectSoilType: "Selecione o tipo de solo.",
      insertMoiustureLevel: "Insira o nível de umidade do solo.",
      valueRangeWarning: "Insira um nível de umidade entre 0 e 100.",
      lowMoistureDanger: "Umidade do solo perigosamente baixa!",
      irrigationNotRequired: "Irrigação não é necessária neste momento.",
      irrigationRequired: "Irrigação precisa ser aplicada.",
    };
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
