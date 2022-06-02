import {defineStore} from "pinia";
import {FacturaEntity} from "src/entities/FacturaEntity";
import {useItemsStore} from "src/store/Items/itemsStore";
import {ItemEntity} from "src/entities/ItemEntity";
import {ApiController} from "src/api/ApiController";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";

const itemsStore = useItemsStore();

export const useFacturaStore = defineStore("factura", {
  state: () => {
    return {
      facturasByID: {} as { [key: string]: FacturaEntity },
    };
  },
  getters: {},
  actions: {
    validateDevolucion(factura: FacturaEntity) {
      const errors: string[] = [];
      if (factura.clienteID == "") {
        errors.push("Debe seleccionar un cliente");
      }
      if (factura.tipoPago == "") {
        errors.push("Debe seleccionar un tipo de pago");
      }
      if (errors.length > 0) {
        return errors;
      }
      factura.detalles.forEach((itemFactura) => {
        const item: ItemEntity = itemsStore.get(itemFactura.codigo);
        if (item) {
          if (itemFactura.cantidad > item.cantidad) {
            errors.push(`No hay suficiente ${item.descripcion}, quedan ${item.cantidad}${item.unidadPreferida}`);
          }
        }
      });
      return errors;
    },
    registerFactura(factura: FacturaEntity) {
      this.facturasByID[factura.id] = factura;
      factura.detalles.forEach((itemFactura) => {
        itemsStore.affect(itemFactura.codigo, (item: ItemEntity) => {
          if (!item) {
            return;
          }
          item.cantidad -= itemFactura.cantidad;
          item.costeTotal -= item.costeUnitario * itemFactura.cantidad;
          return item;
        });
      });
    },
    async findByID(filter: string) {
      return [this.facturasByID[filter]];
    },
    async findByCliente(filter: string) {
      const backEntities = await ApiController.get(`/factura/filtrar?tipo=EVENTOTERCERO&terceroID=${filter}`) as any[];
      backEntities.forEach((factura) => {
        this.facturasByID[factura.id] = new FacturaEntity(factura);
      });
      return Object.values(this.facturasByID).filter(factura => {
        return factura.clienteID.startsWith(filter);
      });
    },
    async findByFecha(filter: string) {
      const backEntities = await ApiController.get(`/factura/filtrar?tipo=EVENTOFECHA&fecha=${filter}`) as any[];
      backEntities.forEach((factura) => {
        this.facturasByID[factura.id] = new FacturaEntity(factura);
      });
      return Object.values(this.facturasByID).filter(factura => {
        return factura.fecha == filter;
      });
    },
  },
  persist: true
})
