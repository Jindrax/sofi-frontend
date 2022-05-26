export class UsuarioEntity {

  id: string
  nombre: string
  email: string
  password: string
  famiempresaID: string
  rol: string


  constructor({
                id,
                nombre,
                email,
                password,
                famiempresaID,
                rol
              }: { id?: string, nombre?: string, email?: string, password?: string, famiempresaID?: string, rol?: string }) {
    this.id = id ? id : "";
    this.nombre = nombre ? nombre : "";
    this.email = email ? email : "";
    this.password = password ? password : "";
    this.famiempresaID = famiempresaID ? famiempresaID : "";
    this.rol = rol ? rol : "";
  }

  static getCode(item: UsuarioEntity): string {
    return item.id;
  }
}
