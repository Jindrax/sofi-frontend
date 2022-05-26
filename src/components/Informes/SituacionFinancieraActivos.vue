<template>
  <div class="column">
    <div class="col">
      <span style="font-weight: bold">Activos</span>
    </div>
    <q-separator/>
    <fila-valor puc="1105" cuenta="caja" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="1110" cuenta="bancos" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="1380" cuenta="cuentas por cobrar" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="14" cuenta="inventarios" :saldo="3000"/>
    <q-separator/>
    <fila-valor puc="1592" cuenta="depreciacion acumulada" :saldo="3000" :negativo="true"/>
    <q-separator/>
  </div>
</template>

<script lang="ts" setup>

import FilaValor from "./FilaValor.vue";
</script>

<style lang="scss" scoped>

</style>
