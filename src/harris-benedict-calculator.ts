import { CalculatorParam, SEX, ActivityLevel } from "./domain/calculator-param";

export class HarrisBenedictCalculator {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  private inquirer = require("inquirer");
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  // use the The Harris–Benedict equations revised by Roza and Shizgal in 1984 in https://musclewiki.com/Harris%E2%80%93Benedict_equation#cite_note-3
  public calculateBMR(params: CalculatorParam): number {
    switch (params.sex) {
      case "men": {
        return (
          88.362 +
          13.397 * params.weight +
          4.799 * params.height -
          5.677 * params.age
        );
      }
      case "women": {
        return (
          447.593 +
          9.247 * params.weight +
          3.098 * params.height -
          4.33 * params.age
        );
      }
      default:
        return 0;
    }
  }
  // this is use the following formula https://gottasport.com/weight-loss/71/harris-benedict-formula-for-women-and-men.html
  // calculate Intake Calorie returns the recommended daily kilocalories to maintain current weight
  public calculateIntakeCalorie(param: CalculatorParam): number {
    const bmr = this.calculateBMR(param);
    return Math.floor(bmr * param.activityLevel);
  }

  public async makeNumberParameter(
    param: number | undefined,
    message: string
  ): Promise<number> {
    switch (typeof param) {
      case "number":
        return param;
      default: {
        //eslint-disable-next-line
        const { inputNumber } = await this.inquirer.prompt([
          {
            type: "input",
            name: "inputNumber",
            message: message,
            validate: function (value: string) {
              const isValid = !isNaN(parseFloat(value));
              return isValid || "Please input a number";
            },
          },
        ]);
        return !isNaN(inputNumber) ? (inputNumber as number) : 0;
      }
    }
  }

  public async makeSexParameter(param: string | undefined): Promise<SEX> {
    switch (param) {
      case "men":
        return "men";
      case "women":
        return "women";
      default: {
        // eslint-disable-next-line
        const { sex } = await this.inquirer.prompt([
          {
            type: "list",
            name: "sex",
            message: "input your biological sex",
            choices: ["men", "women"],
          },
        ]);
        return sex as SEX;
      }
    }
  }
  public async makeActivityLevelParameter(
    param: string | undefined
  ): Promise<ActivityLevel> {
    switch (param) {
      case "little":
        return 1.2;
      case "light":
        return 1.375;
      case "moderate":
        return 1.55;
      case "hard":
        return 1.725;
      case "vary hard":
        return 1.9;
      default: {
        // eslint-disable-next-line
        const { activityLevel } = await this.inquirer.prompt([
          {
            type: "list",
            name: "activityLevel",
            message: "select your activity level",
            choices: [
              { name: "little(little or no exercise)", value: 1.2 },
              { name: "light(exercise/sports 1-3 days/week)", value: 1.375 },
              { name: "moderate(exercise/sports 3-5 days/week)", value: 1.55 },
              { name: "hard(exercise/sports 6-7 days/week)", value: 1.725 },
              {
                name:
                  "very hard(daily exercise/sports & physical job or 2X day training)",
                value: 1.9,
              },
            ],
          },
        ]);
        return activityLevel as ActivityLevel;
      }
    }
  }
}
