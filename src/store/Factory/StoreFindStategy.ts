import {UnwrapRef} from "vue";

export interface StoreFindStategy<T> {
  find(items: {[x: string]: UnwrapRef<T>}): T[];
}
