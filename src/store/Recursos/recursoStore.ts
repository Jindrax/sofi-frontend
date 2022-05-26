import {defineStore} from "pinia";
import {RecursoEntity} from "src/entities/RecursoEntity";

export interface RecursoNode {
  recurso: RecursoEntity;
  children?: { [key: string]: RecursoNode };
}

export const useRecursoStore = defineStore("recurso", {
  state: () => {
    return {
      recursos: [
        {idRecurso: "1", cuenta: "Activos"},
        {idRecurso: "11", cuenta: "Disponible"},
        {idRecurso: "1105", cuenta: "Caja"},
        {idRecurso: "1110", cuenta: "Bancos"},
        {idRecurso: "13", cuenta: "Deudores"},
        {idRecurso: "1305", cuenta: "Clientes"},
        {idRecurso: "14", cuenta: "Inventarios"},
        {idRecurso: "1405", cuenta: "Materias primas"},
        {idRecurso: "1410", cuenta: "Productos en proceso"},
        {idRecurso: "1430", cuenta: "Productos terminados"},
        {idRecurso: "1435", cuenta: "Mercancias no fabricadas por la empresa"},
        {idRecurso: "1455", cuenta: "Materiales repuestos y accesorios"},
        {idRecurso: "1499", cuenta: "Provisiones"},
        {idRecurso: "15", cuenta: "Propiedad planta y equipo"},
        {idRecurso: "1516", cuenta: "Construcciones y edificaciones"},
        {idRecurso: "1524", cuenta: "Equipo de oficina"},
        {idRecurso: "1592", cuenta: "Depreciacion acumulada ACTIVO NEGATIVO"},
        {idRecurso: "16", cuenta: "Intangibles"},
        {idRecurso: "1610", cuenta: "Marcas"},
        {idRecurso: "1635", cuenta: "Licencias"},
        {idRecurso: "18", cuenta: "Otros activos"},
        {idRecurso: "2", cuenta: "Pasivos"},
        {idRecurso: "21", cuenta: "obligaciones"},
        {idRecurso: "2105", cuenta: "Cuentas por pagar a bancos"},
        {idRecurso: "2195", cuenta: "Cuentas por pagar a otras entidades"},
        {idRecurso: "22", cuenta: "Proveedores"},
        {idRecurso: "2205", cuenta: "Cuentas por pagar proveedores nacionales"},
        {idRecurso: "2210", cuenta: "Cuentas por pagar proveedores del exterior"},
        {idRecurso: "23", cuenta: "Otras obligaciones"},
        {idRecurso: "2335", cuenta: "Costos y gastos por pagar"},
        {idRecurso: "24", cuenta: "Impuestos por pagar"},
        {idRecurso: "25", cuenta: "Obligaciones laborales"},
        {idRecurso: "2505", cuenta: "Salarios por pagar"},
        {idRecurso: "28", cuenta: "Otros pasivos"},
        {idRecurso: "3", cuenta: "Patrimonio"},
        {idRecurso: "31", cuenta: "Capital social"},
        {idRecurso: "33", cuenta: "Reservas"},
        {idRecurso: "4", cuenta: "Ingresos"},
        {idRecurso: "41", cuenta: "Ingresoso operacionales"},
        {idRecurso: "4135", cuenta: "Ingreso por ventas"},
        {idRecurso: "4195", cuenta: "Otros ingresos"},
        {idRecurso: "4275", cuenta: "Devoluciones en ventas CREDITO NEGATIVO"},
        {idRecurso: "5", cuenta: "Gastos"},
        {idRecurso: "51", cuenta: "Gastos de adminostracion"},
        {idRecurso: "5105", cuenta: "Gastos de personal"},
        {idRecurso: "5115", cuenta: "Gasto en impuestos"},
        {idRecurso: "5120", cuenta: "Arrendamientos"},
        {idRecurso: "5145", cuenta: "Mantenimiento"},
        {idRecurso: "5160", cuenta: "Depreciacion"},
        {idRecurso: "5195", cuenta: "Otros gastos"},
        {idRecurso: "6", cuenta: "Costos de ventas"},
        {idRecurso: "61", cuenta: "Costo de ventas"},
        {idRecurso: "6195", cuenta: "Otros costos"},
        {idRecurso: "62", cuenta: "Costo por compra"},
        {idRecurso: "6205", cuenta: "Costo por compra de mercancía"},
        {idRecurso: "7", cuenta: "Costos de producción"},
        {idRecurso: "71", cuenta: "Costo de materia prima"},
        {idRecurso: "72", cuenta: "Costo de mano de obra"},
        {idRecurso: "73", cuenta: "Costo indirecto"},
        {idRecurso: "74", cuenta: "Costo por servicios prestados"}
      ] as RecursoEntity[],
      recursosTree: {} as { [key: string]: RecursoNode }
    };
  },
  getters: {
    getTree: (state) => {
      if (Object.keys(state.recursosTree).length == 0) {
        state.recursos.forEach((recurso) => {
          let clase = recurso.idRecurso.substring(0, 1);
          if (recurso.idRecurso.length == 1) {
            state.recursosTree[clase] = {
              recurso: recurso,
              children: {}
            };
            return;
          }
          if (state.recursosTree[clase]) {
            let grupo = recurso.idRecurso.substring(0, 2);
            if (recurso.idRecurso.length == 2) {
              state.recursosTree[clase].children![grupo] = {
                recurso: recurso,
                children: {}
              };
              return;
            }
            if (state.recursosTree[clase].children![grupo]) {
              let cuenta = recurso.idRecurso.substring(0, 4);
              state.recursosTree[clase].children![grupo].children![cuenta] = {
                recurso: recurso
              };
              return;
            }
          }
        });
      }
      return state.recursosTree;
    }
  },
  actions: {
    setRecursos(recursos: RecursoEntity[]) {
      this.recursos = recursos;
    }
  },
  persist: true
})
