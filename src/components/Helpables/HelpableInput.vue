<template>
  <render/>
</template>

<script lang="ts" setup>
import {helpStore} from "src/store/helpStore";
import {computed, h, useSlots} from "vue";
import {QField, QIcon, QInput} from "quasar";

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
    const slot = h(slots.default!()[0]);
    prevClass = slot.props!["class"];
    slot.props!["onClick"] = (e: MouseEvent) => {
      help(e);
    };
    return h(QField, {
      class: "responsive-table-btn",
      label: slot.props!.label,
      onClick: (e: MouseEvent) => {
        help(e);
      },
      onclick: (e: MouseEvent) => {
        help(e);
      },
      readonly: true
    }, {
      append: () => h(QIcon, {name: "info"})
    });
  } else {
    return h(slots.default!()[0], {
      class: prevClass!
    });
  }
};

</script>

<style lang="scss" scoped>

</style>
