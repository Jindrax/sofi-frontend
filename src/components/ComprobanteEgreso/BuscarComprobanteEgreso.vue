<template>
  <EntityReportComponent :store="comprobanteEgresoStore" :schema="esquema" @selected="select">
    <visualizar-comprobante-egreso v-if="selected" :egreso="selected"/>
  </EntityReportComponent>
</template>

<script lang="ts" setup>
import {presentCurrency} from "src/api/utils/CurrencyFormat";
import {ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import EntityReportComponent from "components/EntityReportComponent.vue";
import {Ref, ref} from "vue";
import {useComprobanteEgresoStore} from "src/store/ComprobanteEgreso/comprobanteEgresoStore";
import VisualizarComprobanteEgreso from "components/ComprobanteEgreso/VisualizarComprobanteEgreso.vue";

const comprobanteEgresoStore = useComprobanteEgresoStore();
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
    field: "porConceptoDe",
    label: "Concepto",
    responsive: true,
    type: SchemaFieldType.STRING
  },
  {
    field: "terceroNombre",
    label: "Tercero",
    responsive: true,
    type: SchemaFieldType.STRING
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
