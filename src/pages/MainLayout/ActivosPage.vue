<template>
  <q-page>
    <tab-paneled-page :tabs="['Activos', 'Insumos']">
      <template #Activos>
        <activos-managing-component/>
      </template>
      <template #Insumos>
        <insumos-managing-component/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import ActivosManagingComponent from "components/Activos/ActivosManagingComponent.vue";
import InsumosManagingComponent from "components/Insumos/InsumosManagingComponent.vue";
</script>

<style lang="scss" scoped>

</style>
