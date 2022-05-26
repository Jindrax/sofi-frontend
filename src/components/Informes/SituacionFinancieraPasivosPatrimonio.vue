<template>
  <div class="column">
    <div class="col">
      <span style="font-weight: bold">Pasivos</span>
    </div>
    <q-separator/>
    <fila-valor puc="2195" cuenta="cuentas por pagar" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="2205" cuenta="cuentas por pagar proveedores" :saldo="3000"/>
    <q-separator/>
    <fila-total cuenta="Total Pasivo" :saldo="50000"/>
    <q-separator/>
    <div class="col">
      <span style="font-weight: bold">Patrimonio</span>
    </div>
    <q-separator/>
    <fila-valor puc="31" cuenta="capital" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="3605" cuenta="utilidad del ejercicio" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="3705" cuenta="utilidades acumuladas" :saldo="3000"/>
    <q-separator/>
    <fila-total cuenta="Total Patrimonio" :saldo="50000"/>
    <q-separator/>
  </div>
</template>

<script lang="ts" setup>

import FilaValor from "./FilaValor.vue";
import FilaTotal from "components/Informes/FilaTotal.vue";

</script>

<style lang="scss" scoped>

</style>
