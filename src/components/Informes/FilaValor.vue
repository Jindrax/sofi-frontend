<template>
  <div class="col row">
    <span class="col">{{ puc }}</span>
    <q-separator vertical/>
    <span class="col-6" style="vertical-align: middle">{{ cuenta }}</span>
    <q-separator vertical/>
    <div v-if="negativo" class="col row">
      <div class="col text-center">-</div>
      <div class="col text-right">{{ presentCurrency(saldo) }}</div>
    </div>
    <span v-else class="col text-right">{{ presentCurrency(saldo) }}</span>
  </div>
</template>

<script lang="ts" setup>

import {presentCurrency} from "src/api/utils/CurrencyFormat";

const props = defineProps(
  {
    puc: String,
    cuenta: String,
    saldo: Number,
    negativo: {
      type: Boolean,
      default: false
    }
  }
);


</script>

<style lang="scss" scoped>

</style>
