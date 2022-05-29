import {defineStore} from "pinia";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";

export const useComprobanteEgresoStore = defineStore("comprobanteEgreso", {
  state: () => {
    return {
      comprobantesEgresoByID: {} as { [key: string]: ComprobanteEgresoEntity },
    };
  },
  getters: {},
  actions: {
    validateComprobanteEgreso(comprobanteEgreso: ComprobanteEgresoEntity) {
      const errors: string[] = [];
      if (comprobanteEgreso.recibidoDe == "") {
        errors.push("Debe seleccionar quien entrego el dinero");
      }
      if (comprobanteEgreso.porConceptoDe == "") {
        errors.push("Debe especificar el concepto del egreso");
      }
      return errors;
    },
    registerComprobanteEgreso(comprobanteEgreso: ComprobanteEgresoEntity) {
      this.comprobantesEgresoByID[comprobanteEgreso.id] = comprobanteEgreso;
    },
    findByID(filter: string) {
      return [this.comprobantesEgresoByID[filter]];
    },
    findByCliente(filter: string) {
      return Object.values(this.comprobantesEgresoByID).filter(factura => {
        return factura.recibidoDe.startsWith(filter);
      });
    },
    findByFecha(filter: string) {
      return Object.values(this.comprobantesEgresoByID).filter(factura => {
        return factura.fecha == filter;
      });
    },
  },
  persist: true
})
