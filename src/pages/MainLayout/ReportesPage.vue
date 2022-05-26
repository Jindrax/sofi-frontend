<template>
  <q-page class="q-ml-md column">
    <span class="col-auto titulo-pagina">Reportes</span>
    <div class="col row justify-center">
      <div class="col-auto column justify-center q-gutter-y-lg" style="width: 80%">
        <span class="col-auto comprobante">Seleccione el tipo de reporte que requiere:</span>
        <q-btn class="col-auto advance-btn" label="Facturas"/>
        <q-btn class="col-auto advance-btn" label="Devoluciones"/>
        <q-btn class="col-auto advance-btn" label="Egresos"/>
        <q-btn class="col-auto advance-btn" label="Recibos de caja"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.titulo-pagina {
  font-size: 4vh;
}
.comprobante {
  font-size: 1.9vh;
  font-weight: bold;
  border: 1px solid #1D1D1D;
  padding: 5px;
}
</style>
