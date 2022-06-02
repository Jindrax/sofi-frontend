<template>
  <q-card flat>
    <q-card-section>
      <div :style="{'padding-top': stickyHeight + 'px'}" class="row items-center">
        <span class="titulo-pagina">Comprobante de egreso</span>
        <q-space/>
        <span class="comprobante">Comprobante {{ egreso.id }}</span>
      </div>
      <br>
      <presentador-unitario>
        <q-input label="Fecha" v-model="egreso.fecha" readonly/>
      </presentador-unitario>
      <br>
      <presentador>
        <q-input label="Cantidad" v-model="egreso.cantidad" readonly></q-input>
        <q-input label="Por concepto de" v-model="egreso.porConceptoDe" readonly></q-input>
        <q-select v-model="egreso.tipoGasto" label="Tipo Gasto" :options="opcionesGasto" emit-value map-options
                  readonly/>
      </presentador>
      <br>
      <presentador>
        <q-input label="Pagado A" v-model="egreso.pagadoA" readonly/>
        <q-input label="Nombre" v-model="egreso.terceroNombre" readonly/>
      </presentador>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {Ref, ref} from 'vue';
import Presentador from "components/Presentador.vue";
import PresentadorUnitario from "components/PresentadorUnitario.vue";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";

const props = defineProps<{
  egreso: ComprobanteEgresoEntity
}>()

const stickyHeight = ref(0);
const opcionesGasto = [
  {
    label: "Gastos de personal",
    value: "5105"
  },
  {
    label: "Gastos de arriendo",
    value: "5120"
  },
  {
    label: "Gastos de mantenimiento",
    value: "5145"
  },
  {
    label: "Pago proveedores",
    value: "2195"
  },
  {
    label: "Otros gastos",
    value: "5195"
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
