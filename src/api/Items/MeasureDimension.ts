import {MeasureUnit} from "src/api/Items/MeasureUnit";

export class MeasureDimension {
  symbol: string;
  name: string;
  units: { [key: string]: MeasureUnit } = {};
  baseUnit: string;

  constructor(symbol: string, name: string, baseUnit: MeasureUnit) {
    this.symbol = symbol;
    this.name = name;
    this.baseUnit = baseUnit.name;
    this.units[baseUnit.name] = baseUnit;
  }

  addMeasureUnit(symbol: string, name: string, rateFromBase: number, rateToBase: number) {
    this.units[name] = new MeasureUnit(symbol, name, rateToBase, this.baseUnit);
    this.units[this.baseUnit].addConversionRate(name, rateFromBase);
    return this;
  }

  getUnits(){
    return this.units;
  }
}
