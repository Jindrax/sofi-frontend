<template>
  <q-tabs
    v-model="currentTab"
    align="justify"
    dense
    indicator-color="primary"
    active-class="clase-activa"
    class="clase-inactiva"
  >
    <q-tab v-for="(tab, index) in normalizedTabs" :label="tabs[index]" :name="tab"/>
  </q-tabs>

  <q-separator/>

  <q-tab-panels v-model="currentTab" animated :class="{
    'q-pa-none': $q.platform.is.mobile
  }">
    <q-tab-panel v-for="tab in normalizedTabs" :name="tab" :class="{
    'q-pa-none': $q.platform.is.mobile
  }">
      <slot :name="tab"></slot>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {normalizeName} from "src/utils/StringUtils";

const props = defineProps<{
  tabs: string[]
}>();

const normalizedTabs = props.tabs.map(normalizeName);
const currentTab = ref(normalizedTabs[0]);

onMounted(()=>{
  console.log(currentTab.value);
})

</script>

<style lang="scss" scoped>
.clase-activa{
  background: white;
  color: $javeriana;
}
.clase-inactiva{
  background: $javeriana;
  color: white;
}
</style>
