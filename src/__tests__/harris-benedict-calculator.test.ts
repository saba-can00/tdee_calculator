import { CalculatorParam, ACTIVITY_LEVEL } from "../domain/calculator-param";
import { HarrisBenedictCalculator } from "../harris-benedict-calculator";

describe("Harris Benedict Calculator", () => {
  const testMen = new CalculatorParam(30, 60, 170, "men", ACTIVITY_LEVEL.LIGHT);
  const testWomen = new CalculatorParam(
    55,
    46,
    162,
    "women",
    ACTIVITY_LEVEL.LITTLE
  );
  const calculator = new HarrisBenedictCalculator();
  // use the The Harris–Benedict equations revised by Roza and Shizgal in 1984 in https://musclewiki.com/Harris%E2%80%93Benedict_equation#cite_note-3
  it("calculates the BMR for men", () => {
    expect(calculator.calculateBMR(testMen)).toEqual(
      88.362 + 13.397 * 60 + 4.799 * 170 - 5.677 * 30
    );
  });
  it("calculates the BMR for women", () => {
    expect(calculator.calculateBMR(testWomen)).toEqual(
      447.593 + 9.247 * 46 + 3.098 * 162 - 4.33 * 55
    );
  });
  it("calculates recommended kilocalories for men to maintain the current weight", () => {
    expect(calculator.calculateIntakeCalorie(testMen)).toEqual(
      (88.362 + 13.397 * 60 + 4.799 * 170 - 5.677 * 30) * 1.375
    );
  });
  it("calculates recommended kilocalories for women to maintain the current weight", () => {
    expect(calculator.calculateIntakeCalorie(testWomen)).toEqual(
      (447.593 + 9.247 * 46 + 3.098 * 162 - 4.33 * 55) * 1.2
    );
  });
  it("return men as sex parm when get men as input of -s flag ", () => {
    expect(calculator.makeSexParameter("men")).resolves.toEqual("men");
  });
  it("return women as sex parm when get women as input of -s flag ", () => {
    expect(calculator.makeSexParameter("women")).resolves.toEqual("women");
  });
  // it("return null when get other string than "men" or "women" as input of -s flag ", () => {
  //     expect(calculator.makeSexParameter("other")).toBeNull()
  // })
  it("return 1.2 as activityLevel parm when get little as input of activity flag ", () => {
    expect(calculator.makeActivityLevelParameter("little")).resolves.toEqual(1.2);
  });
  it("return number when get number input for makeNumberParameter ", () => {
    expect(calculator.makeNumberParameter(30, "this is test")).resolves.toEqual(30);
  });
});
