import {StoreFindStategy} from "src/store/Factory/StoreFindStategy";
import {Ref, UnwrapRef} from "vue";
import {ItemEntity} from "src/entities/ItemEntity";

export class ItemsFindComposeStrategy implements StoreFindStategy<ItemEntity> {

  filter: Ref<string>;

  constructor(filter: Ref<string>) {
    this.filter = filter;
  }

  find(items: { [p: string]: UnwrapRef<ItemEntity> }): ItemEntity[] {
    console.log(items);
    return Object.values(items).filter((item) => {
      if(item){
        return item.codigo.toUpperCase().startsWith(this.filter.value.toUpperCase()) || item.descripcion.toUpperCase().startsWith(this.filter.value.toUpperCase());
      }
    });
  }

}
