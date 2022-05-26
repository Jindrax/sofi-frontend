import {ConsolidadoCuentaEntity} from "src/entities/ConsolidadoCuentaEntity";

export class InformeEstadoResultadosEntity {
  dia: string;
  mes: string;
  anno: string;
  ingresos: ConsolidadoCuentaEntity;
  costos: ConsolidadoCuentaEntity;
  gastos: ConsolidadoCuentaEntity;
  utilidadBruta: number;
  utilidadOperativa: number;


  constructor({
                dia,
                mes,
                anno,
                ingresos,
                costos,
                gastos,
                utilidadBruta,
                utilidadOperativa
              }: { dia?: string, mes?: string, anno?: string, ingresos?: ConsolidadoCuentaEntity, costos?: ConsolidadoCuentaEntity, gastos?: ConsolidadoCuentaEntity, utilidadBruta?: number, utilidadOperativa?: number }) {
    this.dia = dia ? dia : "";
    this.mes = mes ? mes : "";
    this.anno = anno ? anno : "";
    this.ingresos = ingresos ? ingresos : new ConsolidadoCuentaEntity({});
    this.costos = costos ? costos : new ConsolidadoCuentaEntity({});
    this.gastos = gastos ? gastos : new ConsolidadoCuentaEntity({});
    this.utilidadBruta = utilidadBruta ? utilidadBruta : 0;
    this.utilidadOperativa = utilidadOperativa ? utilidadOperativa : 0;
  }
}
