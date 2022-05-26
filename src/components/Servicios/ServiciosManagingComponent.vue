<template>
  <entity-managing-component :data="array" :entity-schema="serviciosSchema" entity="servicio" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {useServiciosStore} from "src/store/Servicios/serviciosStore";
import {storeToRefs} from "pinia";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import RecursoModalSelector from "components/Recursos/RecursoModalSelector.vue";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";

const serviciosSchema: EntityFieldSchema[] = [
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
    field: "impuesto",
    label: "Impuesto",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    prefix: "%"
  },
  {
    field: "precio",
    label: "Precio",
    responsive: true,
    type: SchemaFieldType.NUMBER
  },
  {
    field: "fechaCreacion",
    label: "Fecha de creación",
    responsive: true,
    type: SchemaFieldType.DATE
  }
];

const store = useServiciosStore();

const { array } = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
