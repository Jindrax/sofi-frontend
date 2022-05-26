import {getNewDateString} from "src/api/utils/DateFormat";

export class ServicioEntity {
  codigo: string;
  descripcion: string;
  impuesto: number;
  precio: number;
  fechaCreacion: string;
  type: string;

  constructor({
                codigo,
                descripcion,
                fechaCreacion,
                precio,
                impuesto
              }: { codigo?: string, descripcion?: string, impuesto?: number, costeUnitario?: number, precio?: number, fechaCreacion?: string }) {
    this.codigo = codigo ? codigo : "";
    this.descripcion = descripcion ? descripcion : "";
    this.impuesto = impuesto ? impuesto : 0;
    this.precio = precio ? precio : 0;
    this.fechaCreacion = fechaCreacion ? fechaCreacion : getNewDateString();
    this.type = "SERVICIO";
  }

  static getCode(servicio: ServicioEntity): string {
    return servicio.codigo;
  }


}
