import {storeFactory} from "src/store/Factory/StoreFactory";
import {ProveedorEntity} from "src/entities/ProveedorEntity";

export const useProveedoresStore = storeFactory<ProveedorEntity>('proveedores', ProveedorEntity, "/tercero/proveedor");
