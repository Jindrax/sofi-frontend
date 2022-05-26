<template>
  <div class="column q-pa-sm shadow-10">
    <div class="col text-center" style="font-weight: bold">
      <span>Estado de Situación Financiera</span>
    </div>
    <q-separator/>
    <div class="col text-center" style="font-weight: bold">
      <span>A {{informe.dia}} de {{informe.mes}} de {{informe.anno}}</span>
    </div>
    <q-separator/>
    <div v-if="$q.platform.is.desktop" class="col row">
      <div class="col">
        <situacion-financiera-activos/>
      </div>
      <q-separator vertical class="q-mx-sm"/>
      <div class="col">
        <situacion-financiera-pasivos-patrimonio/>
      </div>
    </div>
    <div v-else class="col column">
      <div class="col">
        <situacion-financiera-activos/>
      </div>
      <q-separator/>
      <div class="col">
        <situacion-financiera-pasivos-patrimonio/>
      </div>
    </div>
    <q-separator/>
    <div v-if="$q.platform.is.desktop" class="col row">
      <div class="col">
        <fila-total cuenta="Total Activo" :saldo="10000000"/>
      </div>
      <q-separator vertical class="q-mx-sm"/>
      <div class="col">
        <fila-total cuenta="Total Pasivo más Patrimonio" :saldo="10000000"/>
      </div>
    </div>
    <div v-else class="col column justify-center">
      <div class="col">
        <fila-total cuenta="Total Activo" :saldo="10000000"/>
      </div>
      <q-separator/>
      <div class="col">
        <fila-total cuenta="Total Pasivo más Patrimonio" :saldo="10000000"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import SituacionFinancieraActivos from "./SituacionFinancieraActivos.vue";
import SituacionFinancieraPasivosPatrimonio from "./SituacionFinancieraPasivosPatrimonio.vue";
import FilaTotal from "./FilaTotal.vue";
import {InformeSituacionFinancieraEntity} from "src/entities/InformeSituacionFinancieraEntity";

const props = defineProps<{
  informe: InformeSituacionFinancieraEntity
}>();
</script>

<style lang="scss" scoped>

</style>
