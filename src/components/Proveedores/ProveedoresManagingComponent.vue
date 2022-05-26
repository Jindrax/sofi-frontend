<template>
  <entity-managing-component :entity-schema="proveedoresSchema" :data="array" entity="proveedor" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {storeToRefs} from "pinia";
import {useProveedoresStore} from "src/store/Proveedores/proveedoresStore";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";

const proveedoresSchema: EntityFieldSchema[] = [
  {
    field: "nombre",
    label: "Nombre",
    type: SchemaFieldType.STRING
  },
  {
    field: "proveedorID",
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

const store = useProveedoresStore();

const {array} = storeToRefs(store);
</script>

<style lang="scss" scoped>

</style>
