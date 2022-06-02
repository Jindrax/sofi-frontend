<template>
  <q-page>
    <tab-paneled-page :tabs="['Terceros']">
      <template #Terceros>
        <clientes-managing-component/>
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
