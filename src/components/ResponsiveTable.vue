<template>
  <div>
    <q-markup-table v-if="$q.platform.is.desktop" :style="`max-height: ${height? height : 400}px`"
                    class="item-bordered my-sticky-header-table">
      <thead class="bg-subs">
      <tr>
        <th v-for="col in schema" :key="`table-${col.field}`" class="text-left">{{ col.label }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, itemIndex) in data" :key="`table-item-${itemIndex}`">
        <td v-for="col in schema" :key="`table-item-${itemIndex}-${col.field}`" class="text-left" style="white-space: normal">
          {{ col.prefix ? col.prefix : "" }}{{
              col.formatter ? col.formatter(item[col.field]) : item[col.field]
            }}{{ col.suffix ? col.suffix : "" }}
        </td>
        <td class="text-center">
          <div class="row q-gutter-x-sm">
            <q-btn v-for="(action, actionIndex) in actions" :class="[action.class? action.class : '', 'col']"
                   :icon="action.icon"
                   :label]="action.label" @click="action.onClick(item, itemIndex)"/>
          </div>
        </td>
      </tr>
      </tbody>
    </q-markup-table>
    <div v-else class="column">
      <span v-if="title" class="bg-subs text-center" style="font-size: x-large">{{ title }}</span>
      <q-virtual-scroll
        ref="virtualListRef"
        :items="data"
        separator
        style="max-height: 300px;"
      >
        <template v-slot="{ item, index }">
          <q-expansion-item :group="`table-items`" :label="item[schema[0].field]" header-class="advance-btn"
                            switch-toggle-side @click="selectIndex(index)">
            <q-list separator>
              <q-item v-for="col in responsiveCols" :key="`table-card-${index}-${col.field}`">
                <q-item-section>
                  <q-item-label>{{ col.label }}: {{ col.prefix ? col.prefix : "" }}{{
                      col.formatter ? col.formatter(item[col.field]) : item[col.field]
                    }}{{ col.suffix ? col.suffix : "" }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="row q-gutter-x-xs q-ma-xs">
              <q-btn v-for="(action, actionIndex) in actions" :class="[action.class? action.class : '', 'col']"
                     :icon="action.icon"
                     :label="action.label" v-bind="action.class? {} : {outline: true}"
                     @click="action.onClick(item, index)"/>
            </div>
          </q-expansion-item>
        </template>
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, Ref, ref} from 'vue';
import {ResponsiveTableAction, ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";

const props = defineProps<{
  schema: ResponsiveTableSchemaField[],
  data: Record<string, any>[],
  height?: number,
  title?: string
  actions?: ResponsiveTableAction[]
}>();
const responsiveCols = computed(() => {
  return props.schema.filter((col) => col.responsive);
});
const virtualListRef: Ref<any> = ref(null);

function selectIndex(index: number) {
  //virtualListRef.value!.scrollTo(index, 'start-force')
}


</script>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */




  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #3282B8

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */




  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
