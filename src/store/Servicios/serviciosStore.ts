import {storeFactory} from "src/store/Factory/StoreFactory";
import {ServicioEntity} from "src/entities/ServicioEntity";

export const useServiciosStore = storeFactory<ServicioEntity>('servicios', ServicioEntity, "/inventario/servicio");
