export interface ReportableEntityStore{
  findByID(filter: string):Promise<any[]>;
  findByCliente(filter: string):Promise<any[]>;
  findByFecha(filter: string):Promise<any[]>;
}
