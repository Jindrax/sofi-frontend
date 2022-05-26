<template>
  <q-page>
    <tab-paneled-page :tabs="['Clientes', 'Proveedores']">
      <template #Clientes>
        <clientes-managing-component/>
      </template>
      <template #Proveedores>
        <proveedores-managing-component/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import ClientesManagingComponent from "components/Clientes/ClientesManagingComponent.vue";
import ProveedoresManagingComponent from "components/Proveedores/ProveedoresManagingComponent.vue";
</script>

<style lang="scss" scoped>

</style>
