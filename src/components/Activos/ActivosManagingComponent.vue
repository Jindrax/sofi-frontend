<template>
  <entity-managing-component :data="array" :entity-schema="activosSchema" entity="activo" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {storeToRefs} from "pinia";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {useActivosStore} from "src/store/Activos/activosStore";

const activosSchema: EntityFieldSchema[] = [
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
    field: "unidadTiempo",
    label: "Unidad tiempo vida util",
    responsive: true,
    type: SchemaFieldType.SELECTION,
    options: ["Dias", "Meses", "Años"]
  },
  {
    field: "vidaUtil",
    label: "Vida util",
    responsive: true,
    type: SchemaFieldType.NUMBER
  },
  {
    field: "fechaIngreso",
    label: "Fecha de ingreso",
    responsive: true,
    type: SchemaFieldType.DATE,
    showInTable: false
  }
];

const store = useActivosStore();

const {array} = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
