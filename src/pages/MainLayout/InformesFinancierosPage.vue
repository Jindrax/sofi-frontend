<template>
  <q-page class="q-ma-md column">
    <span class="col-auto titulo-pagina">Informes financieros</span>
    <div class="col row justify-center">
      <div class="col-auto column justify-center q-gutter-y-lg" style="width: 80%">
        <span class="col-auto comprobante">Seleccione el tipo de informe que requiere:</span>
        <q-btn class="col-auto advance-btn" label="Estado de Resultados" @click="requestEstadoResultados"/>
        <q-btn class="col-auto advance-btn" label="Estado de Situación Financiera" @click="requestSituacionFinanciera"/>
      </div>
    </div>
    <situacion-financiera v-if="informe" :informe="informe"/>
    <estado-resultados v-if="estado" :informe="estado"/>
  </q-page>
</template>

<script lang="ts" setup>
import SituacionFinanciera from "components/Informes/SituacionFinanciera.vue";
import {InformeSituacionFinancieraEntity} from "src/entities/InformeSituacionFinancieraEntity";
import {InformeEstadoResultadosEntity} from "src/entities/InformeEstadoResultadosEntity";
import {ConsolidadoCuentaEntity} from "src/entities/ConsolidadoCuentaEntity";
import {CuentaDetalleEntity} from "src/entities/CuentaDetalleEntity";
import EstadoResultados from "components/Informes/EstadoResultados.vue";
import {Ref, ref} from "vue";

function requestSituacionFinanciera(){
  estado.value = undefined;
  informe.value = new InformeSituacionFinancieraEntity({
    dia: "31",
    mes: "Mayo",
    anno: "2022"
  });
}

function requestEstadoResultados(){
  informe.value = undefined;
  estado.value = new InformeEstadoResultadosEntity({
    dia: "31",
    mes: "Mayo",
    anno: "2022",
    ingresos: new ConsolidadoCuentaEntity({
      detalles: [
        new CuentaDetalleEntity({
          puc: "4195",
          cuenta: "ingresos por servicios"
        }),
        new CuentaDetalleEntity({
          puc: "4135",
          cuenta: "ingresos por ventas"
        }),
        new CuentaDetalleEntity({
          puc: "4275",
          cuenta: "devoluciones",
          negativo: true
        }),
      ]
    }),
    costos: new ConsolidadoCuentaEntity({
      detalles: [
        new CuentaDetalleEntity({
          puc: "6135",
          cuenta: "costos por insumos"
        }),
        new CuentaDetalleEntity({
          puc: "6195",
          cuenta: "costo de venta"
        })
      ]
    }),
    gastos: new ConsolidadoCuentaEntity({
      detalles: [
        new CuentaDetalleEntity({
          puc: "5105",
          cuenta: "gastos de personal"
        }),
        new CuentaDetalleEntity({
          puc: "5115",
          cuenta: "gasto en impuestos"
        }),
        new CuentaDetalleEntity({
          puc: "5120",
          cuenta: "arriendo"
        }),
        new CuentaDetalleEntity({
          puc: "5145",
          cuenta: "mantenimiento"
        }),
        new CuentaDetalleEntity({
          puc: "5160",
          cuenta: "depreciacion gasto"
        }),
        new CuentaDetalleEntity({
          puc: "5195",
          cuenta: "otros gastos"
        })
      ]
    })
  });
}

const informe: Ref<InformeSituacionFinancieraEntity | undefined> = ref(undefined);
const estado: Ref<InformeEstadoResultadosEntity | undefined> = ref(undefined);
</script>
<style lang="scss" scoped>
.titulo-pagina {
  font-size: 4vh;
}

.comprobante {
  font-size: 1.9vh;
  font-weight: bold;
  border: 1px solid #1D1D1D;
  padding: 5px;
}
</style>
