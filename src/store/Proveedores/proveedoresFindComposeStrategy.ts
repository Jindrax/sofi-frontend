import {StoreFindStategy} from "src/store/Factory/StoreFindStategy";
import {Ref, UnwrapRef} from "vue";
import {ProveedorEntity} from "src/entities/ProveedorEntity";

export class ProveedoresFindComposeStrategy implements StoreFindStategy<ProveedorEntity> {

  filter: Ref<string>;

  constructor(filter: Ref<string>) {
    this.filter = filter;
  }

  find(proveedores: { [p: string]: UnwrapRef<ProveedorEntity> }): ProveedorEntity[] {
    return Object.values(proveedores).filter((proveedor) => {
      return proveedor.proveedorID.toUpperCase().startsWith(this.filter.value.toUpperCase())|| proveedor.nombre.toUpperCase().startsWith(this.filter.value.toUpperCase());
    });
  }

}
