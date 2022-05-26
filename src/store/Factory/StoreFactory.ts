import {defineStore} from "pinia";
import {UnwrapRef} from "vue";
import {StoreFindStategy} from "src/store/Factory/StoreFindStategy";
import {ApiController} from "src/api/ApiController";

export interface StandardFactory<T> {
  items: { [key: string]: T },
  generateCode: string,
  entity: any,
  array: T[],
  add: (item: T) => void,
  remove: (item: T) => void
}

export const storeFactory = function <T>(storeID: string, entity: any, path: string) {
  return defineStore(storeID, {
    state: () => {
      let items: { [key: string]: T } = {};
      return {
        items: items,
        codigo: "",
        entity: entity
      }
    },
    getters: {
      generateCode: state => {
        return state.codigo;
      },
      array: state => Object.values(state.items),
      find: state => {
        return (strategy: StoreFindStategy<T>) => {
          return strategy.find(state.items);
        }
      }
    },
    actions: {
      async add(item: T) {
        const entityItem = new entity(item);
        this.items[entity.getCode(entityItem)] = entityItem as UnwrapRef<T>;
        try {
          const response = await ApiController.post(path, item);
        } catch (e) {
          console.log(e);
        }
      },
      async remove(item: T) {
        delete this.items[entity.getCode(item)];
      },
      affect(codigo: string, effect: Function) {
        this.items[codigo] = effect(this.items[codigo]);
      },
      get(codigo: string) {
        return this.items[codigo];
      },
      purge() {
        this.items = {};
      },
      async update(item: T) {

      },
      async addBySync(item: T) {
        const entityItem = new entity(item);
        this.items[entity.getCode(entityItem)] = entityItem as UnwrapRef<T>;
      },
      async sync() {
        (await ApiController.catalog<T>(path)).forEach((item) => {
          this.addBySync(item);
        });
      }
    },
    persist: true
  });
}
