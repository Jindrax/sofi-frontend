export class ItemCargaEntity {
  codigo: string;
  costo: number;
  cantidad: number;

  constructor({
                codigo,
                costo,
                cantidad
              }: { codigo?: string, costo?: number, cantidad?: number }) {
    this.codigo = codigo ? codigo : "";
    this.costo = costo ? costo : 0;
    this.cantidad = cantidad ? cantidad : 0;
  }
}
