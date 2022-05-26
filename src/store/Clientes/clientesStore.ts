import {storeFactory} from "src/store/Factory/StoreFactory";
import {ClienteEntity} from "src/entities/ClienteEntity";

export const useClientesStore = storeFactory<ClienteEntity>('clientes', ClienteEntity, "/tercero/cliente");
