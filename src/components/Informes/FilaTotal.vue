<template>
  <div class="col row items-center justify-center">
    <span class="col">{{ cuenta }}</span>
    <span class="col text-right">{{ presentCurrency(saldo) }}</span>
  </div>
</template>

<script lang="ts" setup>

import {presentCurrency} from "src/api/utils/CurrencyFormat";

const props = defineProps<{
  cuenta: string,
  saldo: number
}>();


</script>

<style lang="scss" scoped>
span{
  font-weight: bold;
}

</style>
