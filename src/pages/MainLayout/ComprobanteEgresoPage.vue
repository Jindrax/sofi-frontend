<template>
  <q-page>
    <tab-paneled-page :tabs="['Crear', 'Buscar']">
      <template #Crear>
        <crear-comprobante-egreso/>
      </template>
      <template #Buscar>
        <buscar-comprobante-egreso/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import {Ref, ref} from "vue";
import CrearComprobanteEgreso from "components/ComprobanteEgreso/CrearComprobanteEgreso.vue";
import BuscarComprobanteEgreso from "components/ComprobanteEgreso/BuscarComprobanteEgreso.vue";

</script>
<style lang="scss" scoped>
</style>
