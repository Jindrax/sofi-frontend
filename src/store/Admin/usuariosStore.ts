import {storeFactory} from "src/store/Factory/StoreFactory";
import {ClienteEntity} from "src/entities/ClienteEntity";
import {UsuarioEntity} from "src/entities/UsuarioEntity";

export const useUsuariosStore = storeFactory<UsuarioEntity>('usuarios', UsuarioEntity, "/admin/usuario");
