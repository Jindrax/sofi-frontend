import {defineStore} from "pinia";
import {FacturaEntity} from "src/entities/FacturaEntity";
import {useItemsStore} from "src/store/Items/itemsStore";
import {ItemEntity} from "src/entities/ItemEntity";

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
          if(!item){
            return;
          }
          item.cantidad -= itemFactura.cantidad;
          item.costeTotal -= item.costeUnitario * itemFactura.cantidad;
          return item;
        });
      });
    },
    findByID(filter: string) {
      return [this.facturasByID[filter]];
    },
    findByCliente(filter: string) {
      return Object.values(this.facturasByID).filter(factura => {
        return factura.clienteID.startsWith(filter);
      });
    },
    findByFecha(filter: string) {
      return Object.values(this.facturasByID).filter(factura => {
        return factura.fecha == filter;
      });
    },
  },
  persist: true
})
