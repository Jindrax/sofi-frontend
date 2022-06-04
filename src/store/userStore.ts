import {defineStore} from "pinia";

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
      token: {} as any,
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
    },
    async setToken(token: any){
      this.token = token;
      console.log(this.token);
    },
    logout() {
      this.$reset();
    },
    cargaIniciada() {
      this.cargando = true;
    },
    cargaFinalizada() {
      this.cargando = false;
    }
  },
  persist: true
})
