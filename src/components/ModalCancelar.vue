<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-item class="bg-javeriana">
          <q-item-section>
            <q-item-label>{{ mensaje }}</q-item-label>
          </q-item-section>
        </q-item>
        <br>
        <button-group :btns="btns"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import ButtonGroup from "components/ButtonGroup.vue";
import {useDialogPluginComponent} from "quasar";

const props = defineProps<{
  mensaje: string
}>();

const emits = defineEmits(
  [
    ...useDialogPluginComponent.emits
  ]
)

const {dialogRef, onDialogOK, onDialogHide, onDialogCancel} = useDialogPluginComponent();

const btns = [
  {
    label: "No",
    fn: () => {
      onDialogCancel()
    },
    class: "revert-btn"
  },
  {
    label: "Si",
    fn: () => {
      onDialogOK()
    }
  }
]
</script>

<style lang="scss" scoped>

</style>
