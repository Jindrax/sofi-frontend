import {storeFactory} from "src/store/Factory/StoreFactory";
import {ItemEntity} from "src/entities/ItemEntity";

export const useItemsStore = storeFactory<ItemEntity>('items', ItemEntity, "/inventario/item");
