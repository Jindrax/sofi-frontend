<template>
  <EntityReportComponent :store="devolucionStore" :schema="esquema" @selected="select">
    <visualizador-devolucion v-if="selected" :factura="selected"/>
  </EntityReportComponent>
</template>

<script lang="ts" setup>
import {presentCurrency} from "src/api/utils/CurrencyFormat";
import {ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import EntityReportComponent from "components/EntityReportComponent.vue";
import {Ref, ref} from "vue";
import {useDevolucionStore} from "src/store/Devolucion/devolucionStore";
import VisualizadorDevolucion from "components/Devoluciones/VisualizadorDevolucion.vue";

const devolucionStore = useDevolucionStore();
const selected: Ref<any> = ref(undefined as any);

function select(entity: any) {
  selected.value = entity;
}

const esquema: ResponsiveTableSchemaField[] = [
  {
    field: "id",
    label: "ID",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "fecha",
    label: "Fecha",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "clienteID",
    label: "Nit/CC",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "tipoPago",
    label: "Tipo de pago",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "total",
    label: "Total",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    formatter: presentCurrency,
    prefix: "$"
  }
];
</script>
<style lang="scss" scoped>
.total {
  font-size: 3vh;
}

.titulo-pagina {
  font-size: 4vh;
}

.comprobante {
  font-size: 2.5vh;
  font-weight: bold;
  border: 2px solid #1D1D1D;
  padding: 5px;
}
</style>
