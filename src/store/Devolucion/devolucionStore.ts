import {defineStore} from "pinia";
import {DevolucionEntity} from "src/entities/DevolucionEntity";
import {useItemsStore} from "src/store/Items/itemsStore";
import {ItemEntity} from "src/entities/ItemEntity";

const itemsStore = useItemsStore();

export const useDevolucionStore = defineStore("devolucion", {
  state: () => {
    return {
      devolucionesByID: {} as { [key: string]: DevolucionEntity },
    };
  },
  getters: {},
  actions: {
    validateDevolucion(devolucionEntity: DevolucionEntity) {
      const errors: string[] = [];
      if (devolucionEntity.clienteID == "") {
        errors.push("Debe seleccionar un cliente");
      }
      if (devolucionEntity.tipoPago == "") {
        errors.push("Debe seleccionar un tipo de pago");
      }
      if (errors.length > 0) {
        return errors;
      }
      devolucionEntity.detalles.forEach((itemDevolucion) => {
        const item: ItemEntity = itemsStore.get(itemDevolucion.codigo);
        if (item) {
          if (itemDevolucion.cantidad > item.cantidad) {
            errors.push(`No hay suficiente ${item.descripcion}, quedan ${item.cantidad}${item.unidadPreferida}`);
          }
        }
      });
      return errors;
    },
    registerDevolucion(devolucion: DevolucionEntity) {
      this.devolucionesByID[devolucion.id] = devolucion;
      devolucion.detalles.forEach((itemDevolucion) => {
        itemsStore.affect(itemDevolucion.codigo, (item: ItemEntity) => {
          if (!item) {
            return;
          }
          item.cantidad -= itemDevolucion.cantidad;
          item.costeTotal -= item.costeUnitario * itemDevolucion.cantidad;
          return item;
        });
      });
    },
    findByID(filter: string) {
      return [this.devolucionesByID[filter]];
    },
    findByCliente(filter: string) {
      return Object.values(this.devolucionesByID).filter(devolucion => {
        return devolucion.clienteID.startsWith(filter);
      });
    },
    findByFecha(filter: string) {
      return Object.values(this.devolucionesByID).filter(devolucion => {
        return devolucion.fecha == filter;
      });
    },
  },
  persist: true
})
