import {defineStore} from "pinia";
import {useItemsStore} from "src/store/Items/itemsStore";
import {useServiciosStore} from "src/store/Servicios/serviciosStore";
import {useClientesStore} from "src/store/Clientes/clientesStore";
import {useActivosStore} from "src/store/Activos/activosStore";
import {useInsumosStore} from "src/store/Insumos/insumosStore";
import {useFacturaStore} from "src/store/Facturas/facturaStore";
import {useComprobanteEgresoStore} from "src/store/ComprobanteEgreso/comprobanteEgresoStore";
import {useDevolucionStore} from "src/store/Devolucion/devolucionStore";
import {helpStore} from "src/store/helpStore";
import {useLudificacionStore} from "src/store/ludificacionStore";

export const userStore = defineStore("User", {
  state: () => {
    const permissions: { [key: string]: any[] } = {
      "ADMIN": [
        {
          key: "AM",
          label: "ADMIN"
        }
      ],
      "USUARIO": [
        {
          key: "MP",
          label: "MENÚ PRINCIPAL"
        },
        {
          key: "FV",
          label: "FACTURA DE  VENTA"
        },
        {
          key: "RC",
          label: "RECIBOS DE CAJA"
        },
        {
          key: "CE",
          label: "COMPROBANTES DE EGRESO"
        },
        {
          key: "DV",
          label: "DEVOLUCIONES"
        }, {
          key: "AV",
          label: "ACTIVOS"
        },
        {
          key: "IV",
          label: "INVENTARIO"
        },
        {
          key: "TR",
          label: "TERCEROS"
        },
        {
          key: "EF",
          label: "INFORMES FINANCIEROS"
        }
      ],
    };
    return {
      name: "",
      role: "",
      permissions: permissions,
      token: "",
      cargando: false
    };
  },
  getters: {
    getPermissions(): any[] {
      return this.permissions[this.role];
    }
  },
  actions: {
    login(name: string, role: string, token: string) {
      this.name = name;
      this.role = role;
      this.token = token;
    },
    logout() {
      this.$reset();
    },
    cargaIniciada() {
      this.cargando = false;
    },
    cargaFinalizada() {
      this.cargando = false;
    }
  },
  persist: true
})
