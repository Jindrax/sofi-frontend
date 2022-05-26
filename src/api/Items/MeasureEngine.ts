import {MeasureUnit} from "src/api/Items/MeasureUnit";
import {MeasureDimension} from "src/api/Items/MeasureDimension";


export class MeasureEngine {

  private static _instance = new MeasureEngine();

  dimensions: { [key: string]: MeasureDimension } = {};

  private constructor() {
    this.dimensions["volumen"] = new MeasureDimension("V", "volumen", MeasureUnit.baseUnit("l", "litro"))
      .addMeasureUnit("ml", "mililitro", 1000, 0.001);
    this.dimensions["masa"] = new MeasureDimension("M", "masa", MeasureUnit.baseUnit("kg", "kilogramo"))
      .addMeasureUnit("g", "gramo", 1000, 0.001);
    this.dimensions["longitud"] = new MeasureDimension("L", "longitud", MeasureUnit.baseUnit("m", "metro"))
      .addMeasureUnit("mm", "milimetro", 1000, 0.001);
    this.dimensions["unidad"] = new MeasureDimension("U", "unidad", MeasureUnit.baseUnit("un", "unidades"))
  }

  static instance(){
    return this._instance;
  }

  getDimensionsNames() {
    return Object.keys(this.dimensions);
  }

  getUnitsNames(dimension: string){
    return Object.keys(this.dimensions[dimension].getUnits())
  }

  getUnits(dimension: string){
    return this.dimensions[dimension].getUnits();
  }

}
