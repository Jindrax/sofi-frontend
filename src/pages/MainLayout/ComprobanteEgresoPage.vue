<template>
  <q-page class="column q-ml-md">
    <q-card flat>
      <q-card-section>
        <div :style="{'padding-top': stickyHeight + 'px'}" class="row items-center">
          <span class="titulo-pagina">Comprobante de egreso</span>
          <q-space/>
          <span class="comprobante">Comprobante {{ newEgreso.id }}</span>
        </div>
        <br>
        <presentador-unitario>
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
        </presentador-unitario>
        <br>
        <presentador>
          <q-input label="Cantidad" v-model="newEgreso.cantidad"></q-input>
          <q-input label="Por concepto de" v-model="newEgreso.porConceptoDe"></q-input>
        </presentador>
        <br>
        <presentador>
          <q-input label="Recibido de" v-model="newEgreso.clienteID" readonly @click="selectCliente"/>
          <q-input label="Nombre" v-model="newEgreso.clienteNombre" readonly/>
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
import HelpableBtn from "components/Helpables/HelpableBtn.vue";
import PresentadorUnitario from "components/PresentadorUnitario.vue";
import {ComprobanteEgresoEntity} from "src/entities/ComprobanteEgresoEntity";
import RecursoModalSelector from "components/Recursos/RecursoModalSelector.vue";
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import {useQuasar} from "quasar";

const $q = useQuasar();

const stickyHeight = ref(0);
const newEgreso: Ref<ComprobanteEgresoEntity> = ref(new ComprobanteEgresoEntity({}));

function save() {
  console.log(newEgreso.value);
}

function selectCliente() {
  $q.dialog({
    component: TercerosModalSelector,
  }).onOk((cliente: any) => {
    if (cliente.clienteID) {
      newEgreso.value.recibidoDe = cliente.clienteID;
    } else {
      newEgreso.value.recibidoDe = cliente.proveedorID;
    }
    newEgreso.value.clienteNombre = cliente.nombre;
  });
}

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
