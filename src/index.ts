import { Command, flags } from "@oclif/command";
import { CalculatorParam } from "./domain/calculator-param";
import { HarrisBenedictCalculator } from "./harris-benedict-calculator";

class TdeeCalculator extends Command {
  static readonly descriptionOfAge = "input your age";
  static readonly descriptionOfWeight = "input your weight";
  static readonly descriptionOfHeight = "input your height";

  readonly calculator: HarrisBenedictCalculator = new HarrisBenedictCalculator();

  public static readonly flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "H" }),
    // flag with a value (-n, --name=VALUE)
    age: flags.integer({
      char: "a",
      description: TdeeCalculator.descriptionOfAge,
      required: false,
    }),
    weight: flags.integer({
      char: "w",
      description: TdeeCalculator.descriptionOfWeight,
      required: false,
    }),
    height: flags.integer({
      char: "h",
      description: TdeeCalculator.descriptionOfHeight,
      required: false,
    }),
    sex: flags.string({
      char: "s",
      description: "input your biological sex (men or women)",
      required: false,
    }),
    activityLevel: flags.string({
      char: "l",
      description:
        "input your daily activity level from the following little, light, moderate, heavy",
      required: false,
    }),
  };

  async makeCalculatorParam(
    flags: TdeeCalculatorCommandInput
  ): Promise<CalculatorParam> {
    const age = await this.calculator.makeNumberParameter(
      flags.age,
      TdeeCalculator.descriptionOfAge
    );
    const weight = await this.calculator.makeNumberParameter(
      flags.weight,
      TdeeCalculator.descriptionOfWeight
    );
    const height = await this.calculator.makeNumberParameter(
      flags.height,
      TdeeCalculator.descriptionOfHeight
    );
    const sex = await this.calculator.makeSexParameter(flags.sex);
    const activityLevel = await this.calculator.makeActivityLevelParameter(
      flags.activityLevel
    );
    return new CalculatorParam(age, weight, height, sex, activityLevel);
  }

  async run(): Promise<never> {
    const { flags } = this.parse(TdeeCalculator);
    const param = await this.makeCalculatorParam(flags);
    this.log(
      `The calorie to keep your weight is ${this.calculator.calculateIntakeCalorie(
        param
      )} calories.`
    );
    this.exit(0);
  }
}

type TdeeCalculatorCommandInput = {
  age: number | undefined;
  weight: number | undefined;
  height: number | undefined;
  sex: string | undefined;
  activityLevel: string | undefined;
};

export = TdeeCalculator;
