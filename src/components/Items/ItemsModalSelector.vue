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
        <q-tab name="items" label="Items"/>
        <q-tab name="servicios" label="Servicios" v-if="!itemsOnly"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="items">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-input v-model="filter" autofocus class="col" label="Código o descripción"
                       @update:model-value="search"/>
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
                <th>Código</th>
                <th>Descripción</th>
              </tr>
              </thead>
            </template>

            <template v-slot="{ item, index }">
              <tr :key="index" @click="select(item)">
                <td>{{ item.codigo }}</td>
                <td>{{ item.descripcion }}</td>
              </tr>
            </template>
          </q-virtual-scroll>
        </q-tab-panel>

        <q-tab-panel name="servicios">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-input v-model="filter" autofocus class="col" label="Código o descripción"
                       @update:model-value="search"/>
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
                <th>Código</th>
                <th>Descripción</th>
              </tr>
              </thead>
            </template>

            <template v-slot="{ item, index }">
              <tr :key="index" @click="select(item)">
                <td>{{ item.codigo }}</td>
                <td>{{ item.descripcion }}</td>
              </tr>
            </template>
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>

import {Ref, ref} from "vue";
import {useDialogPluginComponent} from 'quasar';
import {useItemsStore} from "src/store/Items/itemsStore";
import {useServiciosStore} from "src/store/Servicios/serviciosStore";
import {ItemsFindComposeStrategy} from "src/store/Items/ItemsFindComposeStrategy";
import {ServiciosFindComposeStrategy} from "src/store/Servicios/ServiciosFindComposeStrategy";
import {ItemEntity} from "src/entities/ItemEntity";
import {ServicioEntity} from "src/entities/ServicioEntity";
import {usePreferencesStore} from "src/store/preferencesStore";

const props = defineProps<{
  itemsOnly: boolean;
}>();
defineEmits([
  ...useDialogPluginComponent.emits
]);
const {onDialogOK, onDialogHide, onDialogCancel, dialogRef} = useDialogPluginComponent();

const preferedStore = usePreferencesStore();

function updatePrefered(path: string){
  console.log(path);
  preferedStore.setPreferedInventario(path);
}

const tab = ref(preferedStore.preferedInventario);
const itemsStore = useItemsStore();
const serviciosStore = useServiciosStore();
const filter = ref("");
const itemsSearcher = new ItemsFindComposeStrategy(filter);
const serviciosSearcher = new ServiciosFindComposeStrategy(filter);
const searchData: Ref<ItemEntity[] | ServicioEntity[]> = ref([]);

function search() {
  switch (tab.value) {
    case "items":
      searchData.value = itemsStore.find(itemsSearcher);
      break;
    case "servicios":
      searchData.value = serviciosStore.find(serviciosSearcher);
      break;
  }
}

function select(item: ItemEntity | ServicioEntity) {
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
