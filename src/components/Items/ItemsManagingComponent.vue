<template>
  <entity-managing-component :data="array" :entity-schema="itemsSchema" entity="item" :store="store"/>
  <br>
  <q-card>
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>Carga de inventario</q-item-label>
        </q-item-section>
      </q-item>
      <items-loading-component/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import EntityManagingComponent from "components/EntityManagingComponent.vue";
import {useItemsStore} from "src/store/Items/itemsStore";
import {storeToRefs} from "pinia";
import {EntityFieldSchema} from "src/api/interfaces/EntityInterfaces";
import {MeasureEngine} from "src/api/Items/MeasureEngine";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import ItemsLoadingComponent from "components/Items/ItemsLoadingComponent.vue";
import {presentCurrency} from "src/api/utils/CurrencyFormat";

const itemsSchema: EntityFieldSchema[] = [
  {
    field: "codigo",
    label: "Codigo",
    type: SchemaFieldType.STRING
  },
  {
    field: "descripcion",
    label: "Descripcion",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "cantidad",
    label: "Cantidad",
    responsive: true,
    type: SchemaFieldType.NUMBER
  },
  {
    field: "dimension",
    label: "Dimension",
    responsive: true,
    type: SchemaFieldType.SELECTION,
    options: MeasureEngine.instance().getDimensionsNames(),
    showInTable: false
  },
  {
    field: "unidadPreferida",
    label: "Unidad preferida",
    responsive: true,
    type: SchemaFieldType.SELECTION,
    computedOptions: {
      dependencies: ['dimension'],
      compute: (value, oldValue) => {
        if (value[0]) {
          return MeasureEngine.instance().getUnitsNames(value[0]);
        } else {
          return [''];
        }
      }
    },
    showInTable: false
  },
  {
    field: "impuesto",
    label: "Impuesto",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    prefix: "%"
  },
  {
    field: "costeUnitario",
    label: "Coste Unitario",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    formatter: presentCurrency,
    prefix: "$"
  },
  {
    field: "costeTotal",
    label: "Coste Total",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    computed: {
      dependencies: ['costeUnitario', 'cantidad'],
      compute: (value: any[], oldValue: any[]) => {
        if (!isNaN(value[0]) && !isNaN(value[1])) {
          return value[0] * value[1];
        } else {
          return 0;
        }
      }
    },
    showInTable: false,
    formatter: presentCurrency,
    prefix: "$"
  },
  {
    field: "precio",
    label: "Precio de venta",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    formatter: presentCurrency,
    prefix: "$"
  },
  {
    field: "fechaIngreso",
    label: "Fecha de ingreso",
    responsive: true,
    type: SchemaFieldType.DATE,
    showInTable: false
  }
];

const store = useItemsStore();

const {array} = storeToRefs(store);

</script>

<style lang="scss" scoped>

</style>
