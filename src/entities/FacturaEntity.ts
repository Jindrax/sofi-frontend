import {getNewDateString} from "src/api/utils/DateFormat";

export class FacturaEntity {
  id: string;
  detalles: ItemFactura[];
  fecha: string;
  fechaVencimiento?: string;
  clienteID: string;
  clienteNombre: string;
  tipoPago: string;
  total: number;
  totalItems: number;
  totalServicios: number;
  costoTotal: number;


  constructor({
                id,
                detalles,
                fecha,
                fechaVencimiento,
                tipoPago,
                total,
                clienteID,
                clienteNombre,
                costoTotal,
                totalItems,
                totalServicios
              }: { id?: string, detalles?: ItemFactura[], fecha?: string, fechaVencimiento?: string, clienteID?: string, clienteNombre?: string, tipoPago?: string, total?: number, costoTotal?: number, totalItems?: number, totalServicios?: number }) {
    this.id = id ? id : "";
    this.detalles = detalles ? detalles : [];
    this.fecha = fecha ? fecha : getNewDateString();
    this.fechaVencimiento = fechaVencimiento ? fechaVencimiento : getNewDateString();
    this.clienteID = clienteID ? clienteID : "";
    this.clienteNombre = clienteNombre ? clienteNombre : "";
    this.tipoPago = tipoPago ? tipoPago : "";
    this.total = total ? total : 0;
    this.costoTotal = costoTotal ? costoTotal : 0;
    this.totalItems = totalItems ? totalItems : 0;
    this.totalServicios = totalServicios ? totalServicios : 0;
  }
}
