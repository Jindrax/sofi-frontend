<template>
  <q-layout view="lHh Lpr lFf" class="bg-javeriana column items-center justify-center">
    <template v-if="$q.platform.is.desktop">
      <img class="absolute-top-left" src="/escudo.svg" alt="escudo">
      <img class="col-auto bg-white q-ma-lg" src="/logo.png" alt="logo">
      <q-page-container style="height: 50%; width: 80%">
        <router-view/>
      </q-page-container>
    </template>
    <template v-else>
      <div class="column items-center justify-center">
        <img class="col-auto" src="/escudo.svg" alt="escudo" style="width: 60%">
        <img class="col-auto bg-white q-ma-lg" src="/logo.png" alt="logo" style="width: 60%">
        <q-page-container class="col-auto" style="height: 50%; width: 80%">
          <router-view/>
        </q-page-container>
      </div>
    </template>
  </q-layout>
</template>

<script lang="ts" setup>

</script>
