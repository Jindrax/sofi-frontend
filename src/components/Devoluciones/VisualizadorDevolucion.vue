<template>
  <q-card flat>
    <q-card-section>
      <div :style="{'padding-top': stickyHeight + 'px'}" class="row items-center">
        <span class="titulo-pagina">Devolucion de venta</span>
        <q-space/>
        <span class="comprobante">ID Devolucion: {{ devolucion.id }}</span>
      </div>
      <br>
      <responsive-table :data="devolucion.detalles" :schema="esquema" title="Items"/>
      <br>
      <div class="col-auto row items-end justify-end relative-position">
        <q-resize-observer v-if="$q.platform.is.mobile" @resize="({height})=>{stickyHeight = height}"/>
        <span
          class="col-auto q-pa-sm item-bordered shadow-2 total"><b>Total devolucion: ${{
            presentCurrency(devolucion.total)
          }}</b></span>
      </div>
      <br>
      <presentador>
        <q-input v-model="devolucion.fecha" label="Fecha" readonly/>
        <q-input v-model="devolucion.fechaVencimiento" label="Fecha Vencimiento" readonly/>
      </presentador>
      <br>
      <presentador>
        <q-input label="Nit/CC" v-model="devolucion.clienteID" readonly/>
        <q-input label="Nombre" v-model="devolucion.clienteNombre" readonly/>
        <q-input label="Tipo Pago" v-model="devolucion.tipoPago" readonly/>
      </presentador>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import Presentador from "components/Presentador.vue";
import ResponsiveTable from "components/ResponsiveTable.vue";
import {QInput, useQuasar} from "quasar";
import {presentCurrency} from "src/api/utils/CurrencyFormat";
import {ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {DevolucionEntity} from "src/entities/DevolucionEntity";

const props = defineProps<{
  devolucion: DevolucionEntity
}>();
const $q = useQuasar();
const stickyHeight = ref(0);
const columns = [
  {
    name: 'item',
    required: true,
    label: 'Item',
    align: 'left',
    field: 'item',
  },
  {name: 'codigo', align: 'center', label: 'Codigo', field: 'codigo', sortable: true},
  {name: 'precio', label: 'Precio', field: 'precio', sortable: true},
  {name: 'descuento', label: 'Descuento', field: 'descuento'},
  {name: 'impuesto', label: 'Impuesto', field: 'impuesto'},
  {name: 'cantidad', label: 'Cantidad', field: 'cantidad'},
  {name: 'total', label: 'Total', field: 'total'}
]
const esquema: ResponsiveTableSchemaField[] = [
  {
    field: "item",
    label: "Item",
    type: SchemaFieldType.STRING
  },
  {
    field: "codigo",
    label: "Codigo",
    type: SchemaFieldType.NUMBER
  },
  {
    field: "precio",
    label: "Precio",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    formatter: presentCurrency,
    prefix: "$"
  },
  {
    field: "descuento",
    label: "Descuento",
    type: SchemaFieldType.NUMBER
  },
  {
    field: "impuesto",
    label: "Impuesto",
    type: SchemaFieldType.NUMBER,
    formatter: (impuesto: number) => {
      return `${impuesto}%`
    }
  },
  {
    field: "cantidad",
    label: "Cantidad",
    responsive: true,
    type: SchemaFieldType.NUMBER,
    formatter: presentCurrency
  },
  {
    field: "total",
    label: "Total",
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
