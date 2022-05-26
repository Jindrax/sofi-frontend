<template>
  <render/>
</template>

<script lang="ts" setup>
import {helpStore} from "src/store/helpStore";
import {computed, h, useSlots} from "vue";
import {QBadge, QIcon} from "quasar";

const prop = defineProps<{
  helpKey: string
}>();

const slots = useSlots();

const store = helpStore();

const helpState = computed(() => {
  return store.helpFlag;
})

function help(e: Event) {
  store.provideHelp(prop.helpKey);
}

let prevClass: string = "";

const render = () => {
  if (helpState.value) {
    const disabled = h(slots.default!()[0]);
    prevClass = disabled.props!["class"];
    disabled.props!["onClick"] = (e: MouseEvent) => {
      help(e);
    };
    return h(disabled, {
      class: "responsive-table-btn"
    }, () => [
      h(QBadge, {floating: true, class: "advance-btn", outline: true}, () => h(QIcon, {name: "help"}))
    ]);
  } else {
    return h(slots.default!()[0], {
      class: prevClass!
    });
  }
};

</script>

<style lang="scss" scoped>

</style>
