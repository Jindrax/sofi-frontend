<template>
  <q-page>
    <tab-paneled-page :tabs="['Crear', 'Buscar']">
      <template #Crear>
        <crear-factura/>
      </template>
      <template #Buscar>
        <buscar-factura/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import CrearFactura from "components/Facturas/CrearFactura.vue";
import BuscarFactura from "components/Facturas/BuscarFactura.vue";
</script>

<style lang="scss" scoped>

</style>
