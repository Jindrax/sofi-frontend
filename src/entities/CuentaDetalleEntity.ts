export class CuentaDetalleEntity{
  puc: string;
  cuenta: string;
  saldo: number;
  negativo: boolean;


  constructor({puc, cuenta, saldo, negativo}:{puc?: string, cuenta?: string, saldo?: number, negativo?: boolean}) {
    this.puc = puc? puc : "";
    this.cuenta = cuenta? cuenta : "";
    this.saldo = saldo? saldo : 0;
    this.negativo = negativo? negativo : false;
  }
}
