const { test, expect } = require("@playwright/test");

const { MoistureLevelPage } = require("../pages/moistureLevelPage");

let moistureLevelPage;

test.beforeEach(async ({ page }) => {
  moistureLevelPage = new MoistureLevelPage(page);

  await moistureLevelPage.goto();
});

test.describe("On page load", () => {
  test("Check elements", async () => {
    expect(moistureLevelPage.formSoilType).not.toBeNull();
    expect(moistureLevelPage.formMoistureLevel).not.toBeNull();
    expect(moistureLevelPage.btnSubmit).not.toBeNull();
  });
});

test.describe("Check not filled fields", () => {
  test("Soil Type not selected", async () => {
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.selectSoilType);
  });

  test("Moisture Level not filled", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.insertMoiustureLevel);
  });
});

test.describe("Check moisture level range values", () => {
  test("Moisture level min -1", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilMoistureLimits.min - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.valueRangeWarning);
  });

  test("Moisture level min", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilMoistureLimits.min);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.lowMoistureDanger);
  });

  test("Moisture level max", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilMoistureLimits.max);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationNotRequired);
  });

  test("Moisture level max +1", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilMoistureLimits.max + 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.valueRangeWarning);
  });
});

test.describe("Check Thin soil moisture level", () => {
  test("Soil upper level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.thin.upper);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationNotRequired);
  });

  test("Soil upper -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.thin.upper - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.thin.lower);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.thin);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.thin.lower - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.lowMoistureDanger);
  });
});

test.describe("Check Mid soil moisture level", () => {
  test("Soil upper level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.mid);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.mid.upper);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationNotRequired);
  });

  test("Soil upper -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.mid);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.mid.upper - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.mid);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.mid.lower);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.mid);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.mid.lower - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.lowMoistureDanger);
  });
});

test.describe("Check Rough soil moisture level", () => {
  test("Soil upper level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.rough);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.rough.upper);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationNotRequired);
  });

  test("Soil upper -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.rough);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.rough.upper - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.rough);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.rough.lower);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.irrigationRequired);
  });

  test("Soil lower -1 level limit", async () => {
    await moistureLevelPage.selectSoilType(moistureLevelPage.soilTypes.rough);
    await moistureLevelPage.setMoistureLevel(moistureLevelPage.soilConfigs.rough.lower - 1);
    await moistureLevelPage.clickBtnSubmit();

    expect(await moistureLevelPage.adviceText.innerText()).toEqual(moistureLevelPage.adviceMessages.lowMoistureDanger);
  });
});
