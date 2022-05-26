<template>
  <q-page>
    <tab-paneled-page :tabs="['Crear', 'Buscar']">
      <template #Crear>
        <crear-factura @facturaCreada="loadFactura"/>
      </template>
      <template #Buscar>
        <buscar-factura :factura="factura"/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import CrearFactura from "components/Facturas/CrearFactura.vue";
import {Ref, ref} from "vue";
import {FacturaEntity} from "src/entities/FacturaEntity";
import BuscarFactura from "components/Facturas/BuscarFactura.vue";
const factura: Ref<FacturaEntity> = ref(new FacturaEntity({}));
function loadFactura(facturaCreada: FacturaEntity){
  factura.value = facturaCreada;
}
</script>

<style lang="scss" scoped>

</style>
