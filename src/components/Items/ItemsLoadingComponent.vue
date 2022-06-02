<template>
  <presentador>
    <q-input v-model="selectedItem.descripcion" label="Item" readonly @click="selectItem"/>
    <q-input v-model.number="carga.cantidad" label="Cantidad" placeholder="Ingrese cantidad"
             type="number">
    </q-input>
    <q-input v-model.number="carga.costo" label="Costo Unitario" placeholder="Ingrese costo unitario"
             type="number">
    </q-input>
    <template #action>
      <q-btn class="advance-btn" label="Cargar item" @click="load"/>
    </template>
  </presentador>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useItemsStore} from "src/store/Items/itemsStore";
import {storeToRefs} from "pinia";
import Presentador from "components/Presentador.vue";
import ItemsModalSelector from "components/Items/ItemsModalSelector.vue";
import {ItemEntity} from "src/entities/ItemEntity";
import {useQuasar} from "quasar";
import {ItemCargaEntity} from "src/entities/ItemCargaEntity";
import {ApiController} from "src/api/ApiController";

const store = useItemsStore();

const {array} = storeToRefs(store);

const $q = useQuasar();

const selectedItem = ref(new ItemEntity({}));

const carga = ref(new ItemCargaEntity({}));

function selectItem() {
  $q.dialog({
    component: ItemsModalSelector,
  }).onOk((item: ItemEntity) => {
    selectedItem.value = item;
    carga.value.codigo = selectedItem.value.codigo;
  });
}

async function load() {
  const response = await ApiController.post("/inventario/item/carga", carga.value);
  console.log(response);
  await store.addBySync(response);
  $q.notify("Carga realizada exitosamente");
}
</script>

<style lang="scss" scoped>

</style>
