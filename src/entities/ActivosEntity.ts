import {getNewDateString} from "src/api/utils/DateFormat";

export class ActivosEntity {
  codigo: string;
  descripcion: string;
  impuesto: number;
  cantidad: number;
  costo: number;
  vidaUtil: number;
  unidadTiempo: string;
  fechaIngreso: string;
  type: string;


  constructor({
                codigo,
                costo,
                descripcion,
                fechaIngreso,
                impuesto,
                cantidad, unidadTiempo, vidaUtil
              }: { codigo?: string, descripcion?: string, impuesto?: number, costo?: number, fechaIngreso?: string, vidaUtil?: number, cantidad?: number, unidadTiempo?: string }) {
    this.codigo = codigo ? codigo : "";
    this.descripcion = descripcion ? descripcion : "";
    this.impuesto = impuesto ? impuesto : 0;
    this.costo = costo ? costo : 0;
    this.fechaIngreso = fechaIngreso ? fechaIngreso : getNewDateString();
    this.type = "ACTIVO";
    this.cantidad = cantidad ? cantidad : 0;
    this.unidadTiempo = unidadTiempo ? unidadTiempo : "Año";
    this.vidaUtil = vidaUtil ? vidaUtil : 0;
  }

  static getCode(insumo: ActivosEntity): string {
    return insumo.codigo;
  }


}
