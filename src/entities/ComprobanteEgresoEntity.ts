import {getNewDateString} from "src/api/utils/DateFormat";
import {uid} from "quasar";

export class ComprobanteEgresoEntity {
  id: string;
  fecha: string;
  cantidad: number;
  porConceptoDe: string;
  recibidoDe: string;
  clienteNombre: string;

  constructor({
                id,
                cantidad,
                porConceptoDe,
                fecha,
                recibidoDe,
                clienteNombre
              }: { id?: string, fecha?: string, cantidad?: number, porConceptoDe?: string, recibidoDe?: string, clienteNombre?: string }) {
    this.id = id ? id : uid();
    this.fecha = fecha ? fecha : getNewDateString();
    this.cantidad = cantidad ? cantidad : 0;
    this.porConceptoDe = porConceptoDe ? porConceptoDe : "";
    this.recibidoDe = recibidoDe ? recibidoDe : "";
    this.clienteNombre = clienteNombre ? clienteNombre : "";
  }
}
