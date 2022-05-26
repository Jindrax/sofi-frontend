import {defineStore} from "pinia";

export const useLudificacionStore = defineStore("ludificacion", {
  state: () => {
    return {
      level: 1,
      exp: 0
    };
  },
  getters: {
    getNextLevel(state) {
      return 500 * (Math.pow((state.level + 1), 2)) - (500 * (state.level + 1));
    },
    getExpLabel(state) {
      // @ts-ignore
      return `${state.exp}/${this.getNextLevel}`;
    },
    getExpRatio(state) {
      // @ts-ignore
      return state.exp / this.getNextLevel;
    }
  },
  actions: {
    registerExp(exp: number) {
      // @ts-ignore
      const nextLevel: number = this.getNextLevel;
      if (this.exp + exp >= nextLevel) {
        this.level += 1;
        this.exp = 0;
      } else {
        this.exp += exp;
      }
    },
    reset() {
      this.level = 1;
      this.exp = 0;
    }
  },
  persist: true
})
