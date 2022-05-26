<template>
  <entity-managing-component :data="array" :entity-schema="clientesSchema" entity="cliente" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {storeToRefs} from "pinia";
import {useClientesStore} from "src/store/Clientes/clientesStore";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";

const clientesSchema: EntityFieldSchema[] = [
  {
    field: "nombre",
    label: "Nombre",
    type: SchemaFieldType.STRING
  },
  {
    field: "clienteID",
    label: "Nit/CC",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "telefono",
    label: "Teléfono",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "observaciones",
    label: "Observaciones",
    responsive: true,
    type: SchemaFieldType.STRING
  }
];

const store = useClientesStore();

const {array} = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
