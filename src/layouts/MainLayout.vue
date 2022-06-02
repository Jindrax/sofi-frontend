<template>
  <q-layout class="overlay" view="hHh LpR fFf">
    <q-header class="bg-javeriana" elevated>
      <q-toolbar>
        <q-btn class="q-mr-sm" dense flat icon="menu" round @click="openDrawer"/>
        <img v-if="$q.platform.is.desktop" alt="logo" class="col-auto bg-white q-ma-lg" src="/logo.png"
             style="height: 3vh">
        <q-btn flat icon="info" label="Info" round @click="showHelp"/>
        <q-space/>
        <q-item>
          <q-item-section>
            <q-item-label>{{ capitalize(name) }}</q-item-label>
            <q-item-label caption class="text-white" lines="1">{{ capitalize(role) }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn round outline>
              <q-avatar icon="person">
              </q-avatar>
              <q-menu>
                <q-list style="min-width: 30vw">
                  <q-item clickable v-close-popup @click="logout">
                    <q-item-section>Cerrar sesión</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-javeriana drawer-overflow"
      show-if-above
    >
      <div class="bg-javeriana full-width">
        <img alt="escudo" src="/escudo.svg">
      </div>
      <div class="column drawer-overflow">
        <q-item v-for="(link, index) in getPermissions" :key="link.label"
                :to="`/usr=${name.replace(/\s/g,'')}/${link.key}`"
                active-class="link-activo"
                class="link-inactivo">
          <q-item-section>
            <q-item-label class="text-right">{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      class="bg-javeriana drawer-overflow"
      side="right"
    >
      <q-card class="responsive-table-btn">
        <q-card-section>
          {{ helpInfo }}
        </q-card-section>
        <q-card-actions>
          <q-btn label="Cerrar" @click="()=>{
            rightDrawerOpen = false;
            store.closeHelp();
          }" class="revert-btn full-width"/>
        </q-card-actions>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-inner-loading :showing="cargando">
      <q-spinner-gears size="50px" color="primary"/>
    </q-inner-loading>

  </q-layout>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {useQuasar} from "quasar";
import {format} from "quasar";
import {helpStore} from "src/store/helpStore";
import {userStore} from "src/store/userStore";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useItemsStore} from "src/store/Items/itemsStore";
import {useServiciosStore} from "src/store/Servicios/serviciosStore";
import {useClientesStore} from "src/store/Clientes/clientesStore";
import {useActivosStore} from "src/store/Activos/activosStore";
import {useInsumosStore} from "src/store/Insumos/insumosStore";
import {useFacturaStore} from "src/store/Facturas/facturaStore";
import {useComprobanteEgresoStore} from "src/store/ComprobanteEgreso/comprobanteEgresoStore";
import {useDevolucionStore} from "src/store/Devolucion/devolucionStore";
import {useLudificacionStore} from "src/store/ludificacionStore";

const leftDrawerOpen = ref(true);
const rightDrawerOpen = ref(false);

const $q = useQuasar();
const store = helpStore();
const storeUser = userStore();
const {getPermissions, name, role, cargando} = storeToRefs(storeUser);
const {capitalize} = format;
const router = useRouter()

const helpInfo = computed(() => {
  return store.helpInfo;
});

watch(helpInfo, (value, oldValue) => {
  if (value != "") {
    if ($q.platform.is.desktop) {
      rightDrawerOpen.value = true;
    } else {
      $q.notify(value);
    }
  }
})

function openDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function showHelp() {
  store.requestHelp();
}

function logout() {
  userStore().logout();
  useItemsStore().$reset();
  useServiciosStore().$reset();
  useClientesStore().$reset();
  useActivosStore().$reset();
  useInsumosStore().$reset();
  useFacturaStore().$reset();
  useComprobanteEgresoStore().$reset();
  useDevolucionStore().$reset();
  helpStore().$reset();
  useLudificacionStore().$reset();
  router.push("/");
}

</script>

<style>
.drawer-overflow {
  overflow: visible;
}

.link-wrap {
  position: relative;
  overflow: visible;
}

.link-activo {
  width: 80%;
  background: #BBE1FA;
  position: relative;
  left: 24%;
  color: #2C5697 !important;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.link-inactivo {
  color: white;
}
</style>
