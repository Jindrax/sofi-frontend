import {CuentaDetalleEntity} from "./CuentaDetalleEntity";

export class ConsolidadoCuentaEntity {
  total: number;
  detalles: CuentaDetalleEntity[];

  constructor({total, detalles}:{total?: number, detalles?: CuentaDetalleEntity[]}) {
    this.total = total? total : 0;
    this.detalles = detalles? detalles : [];
  }
}
