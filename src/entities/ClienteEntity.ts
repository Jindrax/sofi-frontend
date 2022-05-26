export class ClienteEntity {
  codigo: string;
  nombre: string;
  clienteID: string;
  telefono: string;
  observaciones: string;

  constructor({
                nombre,
                observaciones,
                clienteID,
                telefono,
              }: { nombre?: string, clienteID?: string, telefono?: string, observaciones?: string }) {
    this.nombre = nombre ? nombre : "";
    this.clienteID = clienteID ? clienteID : "";
    this.telefono = telefono ? telefono : "";
    this.observaciones = observaciones ? observaciones : "";
    this.codigo = this.clienteID;
  }

  static getCode(cliente: ClienteEntity): string {
    return cliente.clienteID;
  }


}
