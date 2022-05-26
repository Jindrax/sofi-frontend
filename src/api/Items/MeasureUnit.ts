export type MeasureConversionRate = {[key: string]: number};
export class MeasureUnit{
  symbol:string;
  name: string;
  conversionRate: MeasureConversionRate = {};

  constructor(symbol: string, name: string, rateToBase: number, baseUnit: string) {
    this.symbol = symbol;
    this.name = name;
    this.conversionRate[baseUnit] = rateToBase;
  }

  static baseUnit(symbol: string, name: string){
    return new MeasureUnit(symbol, name, 1, name);
  }

  addConversionRate(to: string, rate: number){
    this.conversionRate[to] = rate;
    return this;
  }
}
