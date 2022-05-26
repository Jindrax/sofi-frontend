import {ConsolidadoCuentaEntity} from "src/entities/ConsolidadoCuentaEntity";

export class InformeSituacionFinancieraEntity {
  dia: string;
  mes: string;
  anno: string;
  activo: ConsolidadoCuentaEntity;
  pasivo: ConsolidadoCuentaEntity;
  patrimonio: ConsolidadoCuentaEntity;


  constructor({
                dia,
                mes,
                anno,
                activo,
                pasivo,
                patrimonio
              }: { dia?: string, mes?: string, anno?: string, activo?: ConsolidadoCuentaEntity, pasivo?: ConsolidadoCuentaEntity, patrimonio?: ConsolidadoCuentaEntity }) {
    this.dia = dia ? dia : "";
    this.mes = mes ? mes : "";
    this.anno = anno ? anno : "";
    this.activo = activo ? activo : new ConsolidadoCuentaEntity({});
    this.pasivo = pasivo ? pasivo : new ConsolidadoCuentaEntity({});
    this.patrimonio = patrimonio ? patrimonio : new ConsolidadoCuentaEntity({});
  }
}
