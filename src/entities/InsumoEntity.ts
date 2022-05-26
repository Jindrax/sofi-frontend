import {getNewDateString} from "src/api/utils/DateFormat";

export class InsumoEntity {
  codigo: string;
  descripcion: string;
  impuesto: number;
  cantidad: number;
  costo: number;
  fechaIngreso: string;
  type: string;


  constructor({
                codigo,
                costo,
                descripcion,
                fechaIngreso,
                impuesto,
                cantidad
              }: { codigo?: string, descripcion?: string, impuesto?: number, costo?: number, fechaIngreso?: string, cantidad?: number }) {
    this.codigo = codigo ? codigo : "";
    this.descripcion = descripcion ? descripcion : "";
    this.impuesto = impuesto ? impuesto : 0;
    this.costo = costo ? costo : 0;
    this.fechaIngreso = fechaIngreso ? fechaIngreso : getNewDateString();
    this.type = "INSUMO";
    this.cantidad = cantidad ? cantidad : 0;
  }

  static getCode(insumo: InsumoEntity): string {
    return insumo.codigo;
  }


}
