import {getNewDateString} from "src/api/utils/DateFormat";
import {uid} from "quasar";

export class ReciboCajaEntity {
  id: string;
  fecha: string;
  suma: number;
  descripcion: string;
  recibidoDe: string;
  recibidoDeNombre: string;
  facturaID: string;
  debito: number;
  credito: number;


  constructor({
                id,
                credito,
                debito,
                descripcion,
                suma,
                fecha,
                facturaID,
                clienteID,
                recibidoDeNombre
              }: { id?: string, fecha?: string, suma?: number, descripcion?: string, clienteID?: string, facturaID?: string, debito?: number, credito?: number, recibidoDeNombre?: string; }) {
    this.id = id ? id : uid();
    this.fecha = fecha ? fecha : getNewDateString();
    this.suma = suma ? suma : 0;
    this.descripcion = descripcion ? descripcion : "";
    this.recibidoDe = clienteID ? clienteID : "";
    this.facturaID = facturaID ? facturaID : "";
    this.debito = debito ? debito : 0;
    this.credito = credito ? credito : 0;
    this.recibidoDeNombre = recibidoDeNombre ? recibidoDeNombre : "";
  }
}
