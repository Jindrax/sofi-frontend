<template>
  <div class="column q-pa-sm shadow-10">
    <div class="col text-center" style="font-weight: bold">
      <span>Estado de Resultados</span>
    </div>
    <q-separator/>
    <div class="col text-center" style="font-weight: bold">
      <span>A {{ informe.dia }} de {{ informe.mes }} de {{ informe.anno }}</span>
    </div>
    <q-separator/>
    <div class="col text-center" style="font-weight: bold">
      <span>Ingresos</span>
    </div>
    <q-separator/>
    <template v-for="ingreso in informe.ingresos.detalles">
      <fila-valor :cuenta="ingreso.cuenta" :puc="ingreso.puc" :saldo="ingreso.saldo" :negativo="ingreso.negativo"/>
      <q-separator/>
    </template>
    <fila-total cuenta="Total Ingresos" :saldo="informe.ingresos.total"/>
    <q-separator/>
    <div class="col text-center" style="font-weight: bold">
      <span>Costos</span>
    </div>
    <q-separator/>
    <template v-for="costo in informe.costos.detalles">
      <fila-valor :cuenta="costo.cuenta" :puc="costo.puc" :saldo="costo.saldo" :negativo="costo.negativo"/>
      <q-separator/>
    </template>
    <fila-total cuenta="Total Costos" :saldo="informe.costos.total"/>
    <q-separator/>
    <fila-total cuenta="Utilidad Bruta" :saldo="informe.utilidadBruta"/>
    <q-separator/>
    <div class="col text-center" style="font-weight: bold">
      <span>Gastos</span>
    </div>
    <q-separator/>
    <template v-for="gasto in informe.gastos.detalles">
      <fila-valor :cuenta="gasto.cuenta" :puc="gasto.puc" :saldo="gasto.saldo" :negativo="gasto.negativo"/>
      <q-separator/>
    </template>
    <fila-total cuenta="Total Gastos" :saldo="informe.gastos.total"/>
    <q-separator/>
    <fila-total cuenta="Utilidad Operativa" :saldo="informe.utilidadOperativa"/>
  </div>
</template>

<script lang="ts" setup>

import FilaTotal from "./FilaTotal.vue";
import {InformeEstadoResultadosEntity} from "src/entities/InformeEstadoResultadosEntity";
import FilaValor from "./FilaValor.vue";

const props = defineProps<{
  informe: InformeEstadoResultadosEntity
}>();
</script>

<style lang="scss" scoped>

</style>
