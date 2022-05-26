import {ActivosEntity} from "src/entities/ActivosEntity";
import {storeFactory} from "src/store/Factory/StoreFactory";

export const useActivosStore = storeFactory<ActivosEntity>('activos', ActivosEntity, "/activo/activo");
