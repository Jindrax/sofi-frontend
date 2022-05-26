<template>
  <entity-managing-component :data="array" :entity-schema="usuariosSchema" entity="usuario" :store="store"/>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {storeToRefs} from "pinia";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {useUsuariosStore} from "src/store/Admin/usuariosStore";

const usuariosSchema: EntityFieldSchema[] = [
  {
    field: "id",
    label: "Cedula",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "nombre",
    label: "Nombre",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "email",
    label: "Email",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "password",
    label: "Contraseña",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "famiempresaID",
    label: "Nit Famiempresa",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "rol",
    label: "Rol",
    responsive: true,
    type: SchemaFieldType.STRING
  }
];

const store = useUsuariosStore();

const {array} = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
