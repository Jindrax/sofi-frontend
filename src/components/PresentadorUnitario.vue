<template>
  <render/>
</template>

<script lang="ts" setup>
import {h, useSlots, VNode} from 'vue';

const slots = useSlots();

function unwrapSlot(slot: VNode) {
  if (slot.props) {
    if (slot.props.label) {
      return {label: slot.props.label ? slot.props.label : '', slot: slot};
    } else {
      const wrapped = (((slot.children as any).default())[0] as VNode);
      return {label: wrapped.props!.label ? wrapped.props!.label : '', slot: slot};
    }
  } else {
    const wrapped = (((slot.children as any))[0] as VNode);
    return {label: wrapped.props!.label ? wrapped.props!.label : '', slot: slot};
  }
}

const render = () => {
  const slot = slots.default!();
  const children = [];
  console.log(slot);
  const unwrappedSlot = unwrapSlot(slot[0]);
  return h("div", [
    h('div', {class: "row shadow-1 presentador-mobile-top"}, h('span', {class: "col q-pa-sm"}, unwrappedSlot.label)),
    h('div', {class: ["column", "presentador-mobile-bottom", "shadow-2"]},
      [
        h('div', {class: "row items-center"}, h('span', {class: "col q-pa-sm"}, unwrappedSlot.slot))
      ]
    )
  ]);
}

</script>

<style lang="scss">
$radius: 10px;
.presentador-mobile-top {
  background: $bg-sub;
  color: white;
  border-top-left-radius: $radius;
  border-top-right-radius: $radius;
}

.presentador-mobile-bottom {
  background: white;
  color: black;
  border-bottom-left-radius: $radius;
  border-bottom-right-radius: $radius;
}

.presentador-mobile-action-bottom {
  border-bottom-left-radius: $radius;
  border-bottom-right-radius: $radius;
}

.presentador-mobile-action-bottom-left {
  border-bottom-left-radius: $radius;
}

.presentador-mobile-action-bottom-right {
  border-bottom-right-radius: $radius;
}
</style>
