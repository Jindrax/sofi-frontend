<template>
  <q-dialog ref="dialogRef">
    <q-card :class="{
      'mobile-modal-selector': $q.platform.is.mobile
    }">
      <q-card-section>
        <q-tree
          :nodes="nodes"
          node-key="value"
          v-model:selected="selected"
          selected-color="red"
        />
      </q-card-section>
      <q-card-section>
        <q-btn label="Seleccionar" class="full-width" @click="select" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useDialogPluginComponent} from 'quasar';
import {RecursoNode, useRecursoStore} from "src/store/Recursos/recursoStore";

const props = defineProps();
defineEmits([
  ...useDialogPluginComponent.emits
]);
const {onDialogOK, onDialogHide, onDialogCancel, dialogRef} = useDialogPluginComponent();

const recursoStore = useRecursoStore();
const selected = ref("");

const recursion: any = (node: RecursoNode) => {
  if (!node.children) {
    return {label: `${node.recurso.idRecurso}: ${node.recurso.cuenta}`, value: node.recurso.idRecurso}
  } else {
    return {
      label: `${node.recurso.idRecurso}: ${node.recurso.cuenta}`,
      children: Object.values(node.children).map(recursion),
      value: node.recurso.idRecurso
    }
  }
}

const nodes = computed(() => {
  let res = [];
  for (let clase of Object.values(recursoStore.getTree)) {
    res.push(recursion(clase));
  }
  return res;
});

function select() {
  onDialogOK(selected.value);
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
