export interface ReportableEntityStore{
  findByID(filter: string):any[];
  findByCliente(filter: string):any[];
  findByFecha(filter: string):any[];
}
