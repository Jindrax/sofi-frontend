import {StoreFindStategy} from "src/store/Factory/StoreFindStategy";
import {Ref, UnwrapRef} from "vue";
import {ServicioEntity} from "src/entities/ServicioEntity";

export class ServiciosFindComposeStrategy implements StoreFindStategy<ServicioEntity> {

  filter: Ref<string>;

  constructor(filter: Ref<string>) {
    this.filter = filter;
  }

  find(items: { [p: string]: UnwrapRef<ServicioEntity> }): ServicioEntity[] {
    return Object.values(items).filter((item) => {
      if (item) {
        return item.codigo.toUpperCase().startsWith(this.filter.value.toUpperCase()) || item.descripcion.toUpperCase().startsWith(this.filter.value.toUpperCase());
      }
    });
  }

}
