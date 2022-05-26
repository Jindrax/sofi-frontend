import {useItemsStore} from "src/store/Items/itemsStore";
import {useServiciosStore} from "src/store/Servicios/serviciosStore";
import {useClientesStore} from "src/store/Clientes/clientesStore";
import {useFamiempresasStore} from "src/store/Admin/famiempresasStore";
import {useUsuariosStore} from "src/store/Admin/usuariosStore";
import {userStore} from "src/store/userStore";

export const syncBack = async () => {
  userStore().cargaIniciada();
  const itemStore = useItemsStore();
  const serviciosStore = useServiciosStore();
  const clienteStore = useClientesStore();
  await itemStore.sync();
  await serviciosStore.sync();
  await clienteStore.sync();
  userStore().cargaFinalizada();
}

export const syncBackAdmin = async () => {
  userStore().cargaIniciada();
  const famiempresaStore = useFamiempresasStore();
  const usuarioStore = useUsuariosStore();
  await famiempresaStore.sync();
  await  usuarioStore.sync();
  userStore().cargaFinalizada();
}
