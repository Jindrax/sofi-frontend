<template>
  <entity-managing-component :data="array" :entity-schema="insumosSchema" entity="insumo" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {useItemsStore} from "src/store/Items/itemsStore";
import {storeToRefs} from "pinia";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";
import {MeasureEngine} from "src/api/Items/MeasureEngine";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import RecursoModalSelector from "components/Recursos/RecursoModalSelector.vue";
import {useInsumosStore} from "src/store/Insumos/insumosStore";

const insumosSchema: EntityFieldSchema[] = [
  {
    field: "codigo",
    label: "Codigo",
    type: SchemaFieldType.STRING
  },
  {
    field: "descripcion",
    label: "Descripcion",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "cantidad",
    label: "Cantidad",
    responsive: true,
    type: SchemaFieldType.NUMBER
  },
  {
    field: "costo",
    label: "Costo",
    responsive: true,
    type: SchemaFieldType.NUMBER
  },
  {
    field: "impuesto",
    label: "Impuesto",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    prefix: "%"
  },
  {
    field: "fechaIngreso",
    label: "Fecha de ingreso",
    responsive: true,
    type: SchemaFieldType.DATE,
    showInTable: false
  }
];

const store = useInsumosStore();

const {array} = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
