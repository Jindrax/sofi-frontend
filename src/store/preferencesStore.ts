import {defineStore} from "pinia";

export const usePreferencesStore = defineStore("preferences", {
  state: () => {
    return {
      preferedInventario: "",
      preferedTerceros: ""
    };
  },
  getters: {
  },
  actions: {
    setPreferedInventario(path: string){
      this.preferedInventario = path;
    },
    setPreferedTerceros(path: string){
      this.preferedTerceros = path;
    }
  },
  persist: true
})
