<template>
  <q-page class="column q-ml-md">
    <tab-paneled-page :tabs="['Crear', 'Buscar']">
      <template #Crear>
        <crear-devolucion/>
      </template>
      <template #Buscar>
        <buscar-devolucion/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import CrearDevolucion from "components/Devoluciones/CrearDevolucion.vue";
import BuscarDevolucion from "components/Devoluciones/BuscarDevolucion.vue";
</script>
<style lang="scss" scoped>
.total {
  font-size: 3vh;
}

.titulo-pagina {
  font-size: 4vh;
}

.comprobante {
  font-size: 2.5vh;
  font-weight: bold;
  border: 2px solid #1D1D1D;
  padding: 5px;
}
</style>
