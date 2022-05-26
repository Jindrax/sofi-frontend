import {storeFactory} from "src/store/Factory/StoreFactory";
import {ItemEntity} from "src/entities/ItemEntity";
import {InsumoEntity} from "src/entities/InsumoEntity";

export const useInsumosStore = storeFactory<InsumoEntity>('insumos', InsumoEntity, "/activo/store");
