import {storeFactory} from "src/store/Factory/StoreFactory";
import {ClienteEntity} from "src/entities/ClienteEntity";
import {FamiempresaEntity} from "src/entities/FamiempresaEntity";

export const useFamiempresasStore = storeFactory<FamiempresaEntity>('famiempresas', FamiempresaEntity, "/admin/famiempresa");
