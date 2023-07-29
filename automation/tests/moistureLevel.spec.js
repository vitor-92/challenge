const { test, expect } = require("@playwright/test");

const { MoistureLevelPage } = require("../pages/moistureLevelPage");

let moistureLevelPage;

test.beforeEach(async ({ page }) => {
  moistureLevelPage = new MoistureLevelPage(page);
  await moistureLevelPage.goto();
});

test("Page Load Test", async () => {
  expect(moistureLevelPage.formSoilType).not.toBeNull();
  expect(moistureLevelPage.formMoistureLevel).not.toBeNull();
  expect(moistureLevelPage.btnSubmit).not.toBeNull();
});

test("Soil Type not selected Validation Test", async () => {
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Selecione o tipo de solo.");
});

test("Moisture Level not filled Validation Test", async () => {
  await moistureLevelPage.selectSoilType("fino");
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Insira o nível de umidade do solo.");
});

test("Moisture Level Limits Validation Test value(-1)", async () => {
  await moistureLevelPage.selectSoilType("fino");
  await moistureLevelPage.setMoistureLevel(-1);
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Insira um nível de umidade entre 0 e 100.");
});

test("Moisture Level Limits Validation Test  value(101)", async () => {
  await moistureLevelPage.selectSoilType("médio");
  await moistureLevelPage.setMoistureLevel(101);
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Insira um nível de umidade entre 0 e 100.");
});

test("Moisture Level Limits Validation Test value(0)", async () => {
  await moistureLevelPage.selectSoilType("grosseiro");
  await moistureLevelPage.setMoistureLevel(0);
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Umidade do solo perigosamente baixa!");
});

test("Moisture Level Limits Validation Test  value(100)", async () => {
  await moistureLevelPage.selectSoilType("médio");
  await moistureLevelPage.setMoistureLevel(100);
  await moistureLevelPage.clickBtnSubmit();

  expect(await moistureLevelPage.adviceText.innerText()).toEqual("Irrigação não é necessária neste momento.");
});
