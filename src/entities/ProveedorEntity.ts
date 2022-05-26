export class ProveedorEntity {
  codigo: string;
  nombre: string;
  proveedorID: string;
  telefono: string;
  observaciones: string;

  constructor({
                nombre,
                observaciones,
                proveedorID,
                telefono
              }: { nombre?: string, proveedorID?: string, telefono?: string, observaciones?: string }) {
    this.nombre = nombre ? nombre : "";
    this.proveedorID = proveedorID ? proveedorID : "";
    this.telefono = telefono ? telefono : "";
    this.observaciones = observaciones ? observaciones : "";
    this.codigo = this.proveedorID;
  }

  static getCode(proveedor: ProveedorEntity): string {
    return proveedor.proveedorID;
  }


}
