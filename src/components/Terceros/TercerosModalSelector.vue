<template>
  <q-dialog ref="dialogRef">
    <q-card :class="{
      'mobile-modal-selector': $q.platform.is.mobile
    }">
      <q-tabs
        v-model="tab"
        @update:model-value="updatePrefered"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="clientes" label="Clientes"/>
        <q-tab name="proveedores" label="Proveedores"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="clientes">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-input v-model="filter" autofocus class="col" label="Nit/CC o Nombre" @update:model-value="search"/>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="search" round @click="search"/>
            </q-item-section>
          </q-item>
          <br>
          <q-virtual-scroll
            :items="searchData"
            style="max-height: 30vh; min-height: 10vh;"
            type="table"
          >
            <template v-slot:before>
              <thead class="thead-sticky text-left">
              <tr>
                <th>Nit/CC</th>
                <th>Nombre</th>
              </tr>
              </thead>
            </template>

            <template v-slot="{ item, index }">
              <tr :key="index" @click="select(item)">
                <td>{{ item.clienteID }}</td>
                <td>{{ item.nombre }}</td>
              </tr>
            </template>
          </q-virtual-scroll>
        </q-tab-panel>

        <q-tab-panel name="proveedores">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-input v-model="filter" autofocus class="col" label="Nit/CC o Nombre" @update:model-value="search"/>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="search" round @click="search"/>
            </q-item-section>
          </q-item>
          <br>
          <q-virtual-scroll
            :items="searchData"
            style="max-height: 30vh; min-height: 10vh;"
            type="table"
          >
            <template v-slot:before>
              <thead class="thead-sticky text-left">
              <tr>
                <th>Nit/CC</th>
                <th>Nombre</th>
              </tr>
              </thead>
            </template>

            <template v-slot="{ item, index }">
              <tr :key="index" @click="select(item)">
                <td>{{ item.proveedorID }}</td>
                <td>{{ item.nombre }}</td>
              </tr>
            </template>
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>

import {Ref, ref, toRaw, unref} from "vue";
import {useDialogPluginComponent} from 'quasar';
import {useClientesStore} from "src/store/Clientes/clientesStore";
import {useProveedoresStore} from "src/store/Proveedores/proveedoresStore";
import {ClienteEntity} from "src/entities/ClienteEntity";
import {ProveedorEntity} from "src/entities/ProveedorEntity";
import {ClientesFindStrategy} from "src/store/Clientes/ClientesFindStrategy";
import {ProveedoresFindComposeStrategy} from "src/store/Proveedores/proveedoresFindComposeStrategy";
import {usePreferencesStore} from "src/store/preferencesStore";

const props = defineProps();
defineEmits([
  ...useDialogPluginComponent.emits
]);
const {onDialogOK, onDialogHide, onDialogCancel, dialogRef} = useDialogPluginComponent();

const preferedStore = usePreferencesStore();

function updatePrefered(path: string){
  preferedStore.setPreferedTerceros(path);
}

const tab = ref(preferedStore.preferedTerceros);

const clienteStore = useClientesStore();
const proveedorStore = useProveedoresStore();
const filter = ref("");
const clienteSearcher = new ClientesFindStrategy(filter);
const proveedorSearcher = new ProveedoresFindComposeStrategy(filter);
const searchData: Ref<ClienteEntity[] | ProveedorEntity[]> = ref([]);

function search() {
  switch (tab.value) {
    case "clientes":
      searchData.value = clienteStore.find(clienteSearcher);
      break;
    case "proveedores":
      searchData.value = proveedorStore.find(proveedorSearcher);
      break;
  }
}

function select(item: ClienteEntity | ProveedorEntity) {
  onDialogOK(item);
}
</script>

<style lang="sass" scoped>
.thead-sticky tr > *,
.tfoot-sticky tr > *
  position: sticky
  opacity: 1
  z-index: 1
  background: $javeriana
  color: white

.thead-sticky tr:last-child > *
  top: 0

.tfoot-sticky tr:first-child > *
  bottom: 0

.mobile-modal-selector
  min-width: 90%
  min-height: 90%
</style>
