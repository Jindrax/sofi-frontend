<template>
  <q-page>
    <tab-paneled-page :tabs="['Famiempresas', 'Usuarios']">
      <template #Famiempresas>
        <famiempresas-managing-component/>
      </template>
      <template #Usuarios>
        <usuarios-managing-component/>
      </template>
    </tab-paneled-page>
  </q-page>
</template>

<script lang="ts" setup>
import TabPaneledPage from "components/TabPaneledPage.vue";
import FamiempresasManagingComponent from "components/Admin/FamiempresasManagingComponent.vue";
import UsuariosManagingComponent from "components/Admin/UsuariosManagingComponent.vue";
</script>

<style lang="scss" scoped>

</style>
