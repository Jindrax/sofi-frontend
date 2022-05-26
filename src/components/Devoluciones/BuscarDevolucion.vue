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
      <responsive-table :schema="esquema" :data="searchData"
                        :actions="[{icon: 'check_circle', onClick: (item, itemIndex)=>{selectedDevolucion = item}, class: 'advance-btn'}]"/>
      <br>
      <visualizador-devolucion v-if="selectedDevolucion" :devolucion="selectedDevolucion"/>
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
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import {useDevolucionStore} from "src/store/Devolucion/devolucionStore";
import {DevolucionEntity} from "src/entities/DevolucionEntity";
import VisualizadorDevolucion from "components/Devoluciones/VisualizadorDevolucion.vue";

const mode = ref("ID");

const options = [
  {label: "Buscar por ID", value: "ID"},
  {label: "Buscar por Cliente", value: "Cliente"},
  {label: "Buscar por Fecha", value: "Fecha"},
]

const devolucionStore = useDevolucionStore();

const filter = ref("");

const searchData = ref([] as DevolucionEntity[]);

const selectedDevolucion: Ref<DevolucionEntity | null> = ref(null);

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
      searchData.value = devolucionStore.findByID(filter.value);
      break;
    case "Cliente":
      searchData.value = devolucionStore.findByCliente(filter.value);
      break;
    case "Fecha":
      searchData.value = devolucionStore.findByFecha(filter.value);
      break;
  }
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
