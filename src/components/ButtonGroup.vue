<template>
  <render/>
</template>

<script lang="ts" setup>
import {h} from 'vue';
import {QBtn, useQuasar} from "quasar";

const props = defineProps<{
  btns: Array<any>
}>();

const render = () => {
  if (useQuasar().platform.is.desktop) {
    return h('div', {class: "row justify-center q-gutter-sm"},
      props.btns!.map((btn: any) => h(QBtn, {
        label: btn.label,
        class: `${btn.weight ? 'col' + '-' + btn.weight : 'col'} ${btn.class ? btn.class : "advance-btn"}`,
        onClick: btn.fn
      }))
    );
  } else {
    return h(
      "div",
      {class: "column q-gutter-y-sm"},
      props.btns!.map((btn: any) => h(QBtn, {
        label: btn.label,
        class: `${btn.weight ? 'col' + '-' + btn.weight : 'col'} ${btn.class ? btn.class : "advance-btn"}`,
        onClick: btn.fn
      }))
    );
  }
}
</script>

<style lang="scss" scoped>

</style>
