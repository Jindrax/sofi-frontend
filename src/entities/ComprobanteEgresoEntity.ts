import {getNewDateString} from "src/api/utils/DateFormat";
import {uid} from "quasar";

export class ComprobanteEgresoEntity {
  id: string;
  fecha: string;
  cantidad: number;
  porConceptoDe: string;
  pagadoA: string;
  terceroNombre: string;
  tipoGasto: string;

  constructor({
                id,
                cantidad,
                porConceptoDe,
                fecha,
                pagadoA,
                terceroNombre,
    tipoGasto
              }: { id?: string, fecha?: string, cantidad?: number, porConceptoDe?: string, pagadoA?: string, terceroNombre?: string, tipoGasto?: string }) {
    this.id = id ? id : uid();
    this.fecha = fecha ? fecha : getNewDateString();
    this.cantidad = cantidad ? cantidad : 0;
    this.porConceptoDe = porConceptoDe ? porConceptoDe : "";
    this.pagadoA = pagadoA ? pagadoA : "";
    this.terceroNombre = terceroNombre ? terceroNombre : "";
    this.tipoGasto = tipoGasto? tipoGasto : "5195";
  }
}
