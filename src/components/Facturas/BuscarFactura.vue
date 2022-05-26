<template>
  <q-card flat>
    <q-card-section>
      <presentador v-if="mode==='ID'">
        <q-select label="Modo" v-model="mode" :options="options" emit-value map-options/>
        <q-input label="ID" v-model="filter"/>
        <q-btn label="Buscar" class="full-width" @click="search"/>
      </presentador>
      <br v-if="mode==='ID'">
      <presentador v-if="mode==='Cliente'">
        <q-select label="Modo" v-model="mode" :options="options" emit-value map-options/>
        <q-input label="Nit/CC" v-model="filter" readonly @click="selectCliente"/>
        <q-btn label="Buscar" class="full-width" @click="search"/>
      </presentador>
      <br v-if="mode==='Cliente'">
      <presentador v-if="mode==='Fecha'">
        <q-select label="Modo" v-model="mode" :options="options" emit-value map-options/>
        <q-input v-model="filter" label="Fecha">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="event">
              <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                <q-date v-model="filter" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup color="primary" flat label="Close"/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn label="Buscar" class="full-width" @click="search"/>
      </presentador>
      <br v-if="mode==='Fecha'">
      <responsive-table :schema="esquema" :data="searchData" :actions="[{icon: 'check_circle', onClick: (item, itemIndex)=>{selectedFactura = item}, class: 'advance-btn'}]"/>
      <br>
      <visualizador-factura v-if="selectedFactura" :factura="selectedFactura"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {Ref, ref} from 'vue';
import Presentador from "components/Presentador.vue";
import ResponsiveTable from "components/ResponsiveTable.vue";
import {QInput, useQuasar} from "quasar";
import {presentCurrency} from "src/api/utils/CurrencyFormat";
import {ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {FacturaEntity} from "src/entities/FacturaEntity";
import {useFacturaStore} from "src/store/Facturas/facturaStore";
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import VisualizadorFactura from "components/Facturas/VisualizadorFactura.vue";

const mode = ref("ID");

const options = [
  {label: "Buscar por ID", value: "ID"},
  {label: "Buscar por Cliente", value: "Cliente"},
  {label: "Buscar por Fecha", value: "Fecha"},
]

const facturaStore = useFacturaStore();

const filter = ref("");

const searchData = ref([] as FacturaEntity[]);

const selectedFactura: Ref<FacturaEntity | null> = ref(null);

function selectCliente() {
  $q.dialog({
    component: TercerosModalSelector,
  }).onOk((cliente: any) => {
    if (cliente.clienteID) {
      filter.value = cliente.clienteID;
    } else {
      filter.value = cliente.proveedorID;
    }
  });
}

function search() {
  switch (mode.value) {
    case "ID":
      searchData.value = facturaStore.findByID(filter.value);
      break;
    case "Cliente":
      searchData.value = facturaStore.findByCliente(filter.value);
      break;
    case "Fecha":
      searchData.value = facturaStore.findByFecha(filter.value);
      break;
  }
  console.log(searchData.value);
}

const $q = useQuasar();

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
