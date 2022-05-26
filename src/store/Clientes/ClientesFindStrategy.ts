import {StoreFindStategy} from "src/store/Factory/StoreFindStategy";
import {Ref, UnwrapRef} from "vue";
import {ClienteEntity} from "src/entities/ClienteEntity";

export class ClientesFindStrategy implements StoreFindStategy<ClienteEntity> {

  filter: Ref<string>;

  constructor(filter: Ref<string>) {
    this.filter = filter;
  }

  find(cliente: { [p: string]: UnwrapRef<ClienteEntity> }): ClienteEntity[] {
    return Object.values(cliente).filter((item) => {
      if (item) {
        return item.clienteID.toUpperCase().startsWith(this.filter.value.toUpperCase()) || item.nombre.toUpperCase().startsWith(this.filter.value.toUpperCase());
      }
    });
  }

}
