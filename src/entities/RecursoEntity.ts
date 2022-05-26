export class RecursoEntity{
  idRecurso: string;
  cuenta: string;


  constructor({idRecurso, cuenta}:{idRecurso?: string, cuenta?: string}) {
    this.idRecurso = idRecurso? idRecurso : "0";
    this.cuenta = cuenta? cuenta : "Cuenta Invalida";
  }

  static getCode(recurso: RecursoEntity): string {
    return recurso.idRecurso;
  }
}
