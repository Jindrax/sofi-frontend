<template>
  <render/>
</template>

<script lang="ts" setup>
import {h, mergeProps, useSlots, VNode, VNodeArrayChildren} from 'vue';
import {useQuasar} from "quasar";

const slots = useSlots();

const props = defineProps<{
  break?: number
}>();

function resolveChildrenMobile() {
  let actions: VNode[] = [];
  if (slots.action) {
    actions = slots.action().map((action) => {
      action.props = mergeProps(action.props!, {class: ["col"]})
      return h(
        action
      )
    });
  }
  const slot = slots.default!();
  const presentadorChildren: VNode[] = [];
  if (slot.length > 1) {
    slot.forEach((slot) => {
      const unwrappedSlot = unwrapSlot(slot);
      presentadorChildren.push(
        h(
          'div',
          {class: "col column"},
          [
            h('span', {class: "col q-pa-sm presentador-mobile-top shadow-1"}, unwrappedSlot.label),
            h('span', {class: "col q-pa-sm presentador-mobile-bottom shadow-2"}, unwrappedSlot.slot)
          ]
        )
      );
    });
  } else {
    const unwrapped = slot[0];
    (unwrapped.children! as VNodeArrayChildren).forEach((slot) => {
      const unwrappedSlot = unwrapSlot((slot as VNode));
      presentadorChildren.push(
        h(
          'div',
          {class: "col column"},
          [
            h('span', {class: "col q-pa-sm presentador-mobile-top shadow-1"}, unwrappedSlot.label),
            h('span', {class: "col q-pa-sm presentador-mobile-bottom shadow-2"}, unwrappedSlot.slot)
          ]
        )
      );
    });
  }
  return [
    ...presentadorChildren,
    ...actions
  ]
}

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

function resolveActions(actions: VNode[] | null) {
  if (actions) {
    let resolvedActions: VNode[] = actions.map((action, index, arr) => {
      action.props = mergeProps(action.props!, {
        class: ["col"]
      });
      if (index == 0) {
        action.props = mergeProps(action.props!, {
          class: ["presentador-mobile-action-bottom-left"]
        });
      }
      if (index == arr.length - 1) {
        action.props = mergeProps(action.props!, {
          class: ["presentador-mobile-action-bottom-right"]
        });
      }
      return h(action)
    })
    return h('div', {class: ["row q-gutter-x-sm"]}, resolvedActions)
  } else {
    return null;
  }
}

function resolvePresentador(slot: VNode[], actions: VNode[] | null) {
  let presentadorTopChildren: VNode[] = [];
  let presentadorBottomChilden: VNode[] = [];
  if (slot.length > 1) {
    slot.forEach((slot) => {
      const unwrappedSlot = unwrapSlot(slot);
      presentadorTopChildren.push(h('span', {class: "col q-pa-sm"}, unwrappedSlot.label));
      presentadorBottomChilden.push(h('span', {class: "col q-pa-sm"}, unwrappedSlot.slot));
    });
  } else {
    const unwrapped = slot[0];
    (unwrapped.children! as VNodeArrayChildren).forEach((slot) => {
      const unwrappedSlot = unwrapSlot((slot as VNode));
      presentadorTopChildren.push(h('span', {class: "col q-pa-sm"}, unwrappedSlot.label));
      presentadorBottomChilden.push(h('span', {class: "col q-pa-sm"}, unwrappedSlot.slot));
    });
  }
  return h("div", [
    h('div', {class: "row shadow-1 presentador-mobile-top"}, presentadorTopChildren),
    h('div', {class: ["column", "presentador-mobile-bottom", "shadow-2"]},
      [
        h('div', {class: "row items-center"}, presentadorBottomChilden),
        resolveActions(actions)
      ]
    )
  ]);
}

const render = () => {
  const itemBreak = props.break ? props.break : 4;
  if (useQuasar().platform.is.desktop) {
    const slot = slots.default!();
    let actions = null;
    if (slots.action) {
      actions = slots.action();
    }
    const children = [];
    if (slot.length > 1) {
      for (let i = 0; i < slot.length; i = i + itemBreak) {
        if (i + itemBreak > slot.length) {
          children.push(resolvePresentador(slot, actions));
        } else {
          children.push(resolvePresentador(slot, null));
        }
      }
      return h('div', children);
    } else {
      let slotChildren = (slot[0].children as VNode[]);
      if (slotChildren) {
        for (let i = 0; i < slotChildren.length; i = i + itemBreak) {
          if (i + itemBreak > slotChildren.length) {
            children.push(resolvePresentador(slotChildren.slice(i, i + itemBreak), actions));
          } else {
            children.push(resolvePresentador(slotChildren.slice(i, i + itemBreak), null));
          }
        }
      } else {
        const unwrappedSlot = unwrapSlot(slot[0]);
        return h("div", [
          h('div', {class: "row shadow-1 presentador-mobile-top"}, h('span', {class: "col q-pa-sm"}, unwrappedSlot.label)),
          h('div', {class: ["column", "presentador-mobile-bottom", "shadow-2"]},
            [
              h('div', {class: "row items-center"}, h('span', {class: "col q-pa-sm"}, unwrappedSlot.slot)),
              resolveActions(actions)
            ]
          )
        ]);
      }
      return h('div', children);
    }
  } else {
    return h(
      "div",
      {class: "column q-gutter-y-sm"},
      resolveChildrenMobile()
    );
  }
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
