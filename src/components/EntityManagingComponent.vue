<template>
  <div class="column justify-start q-gutter-y-sm">
    <responsive-table :actions="[
      {icon: 'edit_note', onClick: editAction, class: 'advance-btn'},
      {icon: 'delete', onClick: deleteAction, class: 'revert-btn shadow-10'},
      {icon: 'print', onClick: print, class: 'revert-btn shadow-10'}
    ]" :data="data" :schema="tableSchema">
    </responsive-table>
    <presentador v-if="newFlag || editFlag !== -1" :break="3">
      <template v-for="(field, i) in entitySchema">
        <q-input v-if="field.type === SchemaFieldType.STRING" v-model="holders[field.field].value" :label="field.label"
                 type="text" v-bind:suffix="field.suffix? field.suffix : undefined"
                 v-bind:prefix="field.prefix? field.prefix : undefined"/>
        <q-input v-else-if="field.type === SchemaFieldType.NUMBER" v-model.number="holders[field.field].value"
                 :label="field.label" v-bind:suffix="field.suffix? field.suffix : undefined"
                 v-bind:prefix="field.prefix? field.prefix : undefined"
                 type="number"/>
        <q-input v-else-if="field.type === SchemaFieldType.DATE" v-model="holders[field.field].value"
                 :label="field.label" v-bind:suffix="field.suffix? field.suffix : undefined"
                 v-bind:prefix="field.prefix? field.prefix : undefined">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="event">
              <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                <q-date v-model="holders[field.field].value" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup color="primary" flat label="Close"/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select v-else-if="field.type === SchemaFieldType.SELECTION" v-model="holders[field.field].value"
                  :label="field.label"
                  :options="field.computedOptions? computedOptions[field.field].value : field.options"/>
        <q-input v-else-if="field.type === SchemaFieldType.DIALOG" :label="field.label"
                 v-model="holders[field.field].value" readonly @click="()=>{
                   $q.dialog({
                      component: field.dialog.component,
                    }).onOk(payload => {holders[field.field].value = field.dialog.onSuccess(payload)}).onCancel(field.dialog.onFailure());
                 }"/>
      </template>
    </presentador>
    <q-btn :label="`Agregar ${entity}`" class="advance-btn" @click="addAction" v-if="!newFlag && editFlag===-1"/>
    <div v-else-if="newFlag" class="row q-gutter-x-xs q-ma-xs">
      <q-btn class="col revert-btn shadow-10" label="Cancelar" @click="cancelAction"/>
      <q-btn :label="`Guardar ${entity}`" class="col advance-btn text-no-wrap" @click="saveAction"/>
    </div>
    <div v-else-if="editFlag!==-1" class="row q-gutter-x-xs q-ma-xs">
      <q-btn class="col revert-btn shadow-10" label="Cancelar" @click="cancelAction"/>
      <q-btn :label="`Editar ${entity}`" class="col advance-btn text-no-wrap" @click="editSaveAction"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineProps,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  shallowReactive,
  watch,
  WatchStopHandle
} from "vue";
import Presentador from "components/Presentador.vue";
import ResponsiveTable from "components/ResponsiveTable.vue";
import {QField, useQuasar} from "quasar";
import ModalCancelar from "components/ModalCancelar.vue";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";
import {StandardFactory} from "src/store/Factory/StoreFactory";
import HelpableBtn from "components/Helpables/HelpableBtn.vue";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {getNewDateString} from "src/api/utils/DateFormat";

const $q = useQuasar();

const props = defineProps<{
  entity: string,
  entitySchema: EntityFieldSchema[],
  data: any[],
  store: StandardFactory<any>
}>();

const tableSchema = computed(() => {
  return props.entitySchema.filter((col) => {
    if (col.showInTable === undefined) {
      return true;
    } else {
      return col.showInTable;
    }
  });
})

function setField(field: EntityFieldSchema): Ref<string | number | null> {
  switch (field.type) {
    case SchemaFieldType.NUMBER:
      if (field.field === 'codigo') {
        return ref(props.store.generateCode);
      } else {
        return ref(0);
      }
    case SchemaFieldType.STRING:
      return ref("");
    case SchemaFieldType.DATE:
      return ref(getNewDateString());
    case SchemaFieldType.SELECTION:
      return ref(null);
    default:
      return ref("");
  }
}

function resetField(field: EntityFieldSchema): string | number | null {
  switch (field.type) {
    case SchemaFieldType.NUMBER:
      if (field.field === 'codigo') {
        return props.store.generateCode;
      } else {
        return 0;
      }
    case SchemaFieldType.STRING:
      return "";
    case SchemaFieldType.DATE:
      return getNewDateString();
    case SchemaFieldType.SELECTION:
      return null;
    default:
      return "";
  }
}

const holders: { [key: string]: Ref<string | number | null> } = shallowReactive({});
const computedOptions: { [key: string]: Ref<string[] | string | number | null> } = shallowReactive({});

props.entitySchema.forEach((field) => {
  holders[field.field] = setField(field);
  if (field.computedOptions) {
    computedOptions[field.field] = setField(field);
  }
});

const computedFields: WatchStopHandle[] = [];

onMounted(() => {
  processComputedFields();
});

onUnmounted(() => {
  //dismantleComputedFields();
})

function processComputedFields() {
  props.entitySchema.forEach((field) => {
    if (field.computed) {
      computedFields.push(watch(
        field.computed.dependencies.map((dependency) => {
          return holders[dependency];
        }),
        (value, oldValue) => {
          holders[field.field].value = field.computed!.compute(value, oldValue);
        }
      ))
    }
    if (field.computedOptions) {
      computedFields.push(watch(
        field.computedOptions.dependencies.map((dependency) => {
          return holders[dependency];
        }),
        ((value, oldValue) => {
          computedOptions[field.field].value = field.computedOptions!.compute(value, oldValue);
        })
      ))
    }
  });
}

function dismantleComputedFields() {
  computedFields.forEach((computedField) => {
    computedField();
  })
}

const newFlag = ref(false);
const editFlag = ref(-1);

function addAction() {
  newFlag.value = true;
}

function cancelAction() {
  $q.dialog({
    component: ModalCancelar,
    componentProps: {
      mensaje: '¿Seguro que quieres cancelar?'
    }
  }).onOk(payload => {
    newFlag.value = false;
    editFlag.value = -1;
  })
}

function saveAction() {
  let newEntity: { [key: string]: any } = new props.store.entity({});
  props.entitySchema.forEach(field => {
    newEntity[field.field] = holders[field.field].value;
  });
  props.store.add(newEntity);
  for (let field of props.entitySchema) {
    holders[field.field].value = resetField(field);
  }
  newFlag.value = false;
}

function editAction(item: any, itemIndex: number) {
  props.entitySchema.forEach((field, fieldIndex) => {
    holders[field.field].value = item[field.field];
  });
  editFlag.value = itemIndex;
}

function print(item: any, itemIndex: number) {
  console.log(item);
}

function editSaveAction() {
  try {
    props.entitySchema.forEach((field, fieldIndex) => {
      props.data[editFlag.value][field.field] = holders[field.field].value;
    });
    editFlag.value = -1;
  } catch (e) {
    console.log(e);
  }
}

function deleteAction(item: any, itemIndex: number) {
  props.store.remove(item);
}

</script>

<style lang="scss" scoped>

</style>
