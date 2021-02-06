
export class CalculatorParam {
  constructor(
    public age: Age,
    public weight: Weight,
    public height: Height,
    public sex: SEX,
    public activityLevel: ActivityLevel
  ) {}
}
// parameter propertiesを利用すると、eslintのno-use-constructorでエラーになる
// vs-codeとpackage-jsonの設定はまた異なる

export type Age = number
export type Weight = number
export type Height = number
export type SEX = 'men' | 'women' 
export const ACTIVITY_LEVEL = {
  LITTLE : 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55, 
  HARD: 1.725,
  VERY_HARD: 1.9
} as const
export type ActivityLevel = typeof ACTIVITY_LEVEL[keyof typeof ACTIVITY_LEVEL]