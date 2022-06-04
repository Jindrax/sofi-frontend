<template>
  <q-page class="column q-ml-md">
    <q-card flat>
      <q-card-section>
        <div :style="{'padding-top': stickyHeight + 'px'}" class="row items-center">
          <span class="titulo-pagina">Comprobante de egreso</span>
          <q-space/>
          <helpable-span help-key="egreso:id">
            <span class="comprobante" label="ID Comprobante">Comprobante {{ newEgreso.id }}</span>
          </helpable-span>
        </div>
        <br>
        <presentador-unitario>
          <helpable-input help-key="egreso:fecha">
            <q-input label="Fecha" v-model="newEgreso.fecha">
              <template v-slot:append>
                <q-icon class="cursor-pointer" name="event">
                  <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                    <q-date v-model="newEgreso.fecha" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup color="primary" flat label="Close"/>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </helpable-input>
        </presentador-unitario>
        <br>
        <presentador>
          <helpable-input help-key="egreso:cantidad">
            <q-input label="Cantidad" v-model="newEgreso.cantidad"></q-input>
          </helpable-input>
          <helpable-input help-key="egreso:concepto">
            <q-input label="Por concepto de" v-model="newEgreso.porConceptoDe"></q-input>
          </helpable-input>
          <helpable-input help-key="egreso:tipo">
            <q-select v-model="newEgreso.tipoGasto" label="Tipo Gasto" :options="opcionesGasto" emit-value map-options/>
          </helpable-input>
        </presentador>
        <br>
        <presentador>
          <helpable-input help-key="egreso:pagadoA">
            <q-input label="Pagado A" v-model="newEgreso.pagadoA" readonly @click="selectCliente"/>
          </helpable-input>
          <helpable-input help-key="egreso:nombre">
            <q-input label="Nombre" v-model="newEgreso.terceroNombre" readonly/>
          </helpable-input>
        </presentador>
        <br>
        <button-group :btns="[
            {
              label: 'Anular',
              fn: ()=>{
                $q.dialog({
                component: ModalCancelar,
                componentProps: {
                  mensaje: '¿Seguro que quieres anular?'
                }
                }).onOk(payload => {
                  $q.notify('Anulado');
                }).onCancel(() => {
                  $q.notify('Cancelado')
                })
              },
              class: 'revert-btn'
            },
            {
              label: 'Guardar',
              fn: save
            }
            ]"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import {Ref, ref} from 'vue';
import Presentador from "components/Presentador.vue";
import ButtonGroup from "components/ButtonGroup.vue";
import ModalCancelar from "components/ModalCancelar.vue";
import PresentadorUnitario from "components/PresentadorUnitario.vue";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import {useQuasar} from "quasar";
import {useComprobanteEgresoStore} from "src/store/ComprobanteEgreso/comprobanteEgresoStore";
import {ApiController} from "src/api/ApiController";
import HelpableSpan from "components/Helpables/HelpableSpan.vue";
import HelpableInput from "components/Helpables/HelpableInput.vue";

const $q = useQuasar();

const store = useComprobanteEgresoStore();

const stickyHeight = ref(0);
const newEgreso: Ref<ComprobanteEgresoEntity> = ref(new ComprobanteEgresoEntity({}));

function save() {
  console.log(newEgreso.value);
  const errors = store.validateComprobanteEgreso(newEgreso.value);
  if (errors.length > 0) {
    errors.forEach(error => {
      $q.notify(error);
    });
  } else {
    try {
      store.registerComprobanteEgreso(newEgreso.value);
      const response = ApiController.post("/egreso", newEgreso.value);
      newEgreso.value = new ComprobanteEgresoEntity({});
      $q.notify("Comprobante de egreso guardado exitosamente");
    } catch (e) {
      console.log(e);
    }
  }
}

function selectCliente() {
  $q.dialog({
    component: TercerosModalSelector,
  }).onOk((cliente: any) => {
    if (cliente.clienteID) {
      newEgreso.value.pagadoA = cliente.clienteID;
    } else {
      newEgreso.value.pagadoA = cliente.proveedorID;
    }
    newEgreso.value.terceroNombre = cliente.nombre;
  });
}

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
