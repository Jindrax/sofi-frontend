import {defineStore} from "pinia";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";
import {ApiController} from "src/api/ApiController";

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
      if (comprobanteEgreso.pagadoA == "") {
        errors.push("Debe seleccionar a quien entrego el dinero");
      }
      if (comprobanteEgreso.porConceptoDe == "") {
        errors.push("Debe especificar el concepto del egreso");
      }
      return errors;
    },
    registerComprobanteEgreso(comprobanteEgreso: ComprobanteEgresoEntity) {
      this.comprobantesEgresoByID[comprobanteEgreso.id] = comprobanteEgreso;
    },
    async findByID(filter: string) {
      await ApiController.get(`/egreso/filtrar?tipo=EVENTO&`);
      return [this.comprobantesEgresoByID[filter]];
    },
    async findByCliente(filter: string) {
      const backEntities = await ApiController.get(`/egreso/filtrar?tipo=EVENTOTERCERO&terceroID=${filter}`) as any[];
      backEntities.forEach((egreso) => {
        this.comprobantesEgresoByID[egreso.id] = new ComprobanteEgresoEntity(egreso);
      });
      return Object.values(this.comprobantesEgresoByID).filter(factura => {
        return factura.pagadoA.startsWith(filter);
      });
    },
    async findByFecha(filter: string) {
      const backEntities = await ApiController.get(`/egreso/filtrar?tipo=EVENTOFECHA&fecha=${filter}`) as any[];
      backEntities.forEach((egreso) => {
        this.comprobantesEgresoByID[egreso.id] = new ComprobanteEgresoEntity(egreso);
      });
      return Object.values(this.comprobantesEgresoByID).filter(factura => {
        return factura.fecha == filter;
      });
    },
  },
  persist: true
})
