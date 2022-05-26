export class FamiempresaEntity {
  nit: string
  razonSocial: string

  constructor({nit, razonSocial}: { nit?: string, razonSocial?: string }) {
    this.nit = nit ? nit : "";
    this.razonSocial = razonSocial ? razonSocial : "";
  }

  static getCode(item: FamiempresaEntity): string {
    return item.nit;
  }
}
