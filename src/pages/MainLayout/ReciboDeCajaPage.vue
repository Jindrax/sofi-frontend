<template>
  <q-page class="column q-ml-md">
    <q-card flat>
      <q-card-section>
        <div :style="{'padding-top': stickyHeight + 'px'}" class="row items-center">
          <span class="titulo-pagina">Recibo de caja</span>
          <q-space/>
          <span class="comprobante">Recibo {{ newRecibo.id }}</span>
        </div>
        <br>
        <presentador-unitario>
          <q-input label="Fecha" v-model="newRecibo.fecha">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                  <q-date v-model="newRecibo.fecha" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Cerrar"/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </presentador-unitario>
        <presentador>
          <q-input label="Cantidad" v-model="newRecibo.cantidad"></q-input>
          <q-input label="Por concepto de" v-model="newRecibo.porConceptoDe"></q-input>
        </presentador>
        <br>
        <presentador>
          <q-input label="Recibido de" v-model="newRecibo.recibidoDe" readonly @click="selectCliente"/>
          <q-input label="Nombre" v-model="newRecibo.recibidoDeNombre" readonly/>
        </presentador>
        <presentador>
          <helpable-input help-key="recibo:factura">
            <span v-bind="{label: '# Factura'}">001</span>
          </helpable-input>
          <span v-bind="{label: 'Debito'}">1234</span>
          <span v-bind="{label: 'Credito'}">123</span>
        </presentador>
        <br>
        <button-group :btns="[
            {
              label: 'Cancelar',
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
              fn: ()=>{
                $q.notify('Sirve');
              }
            }
            ]"/>
        <q-dialog v-model="modal">
          <q-card>
            <q-card-section>
              <q-input class="col" label="Nombre"/>
              <q-input class="col" label="Codigo"/>
              <q-btn label="Seleccinar"/>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import Presentador from "components/Presentador.vue";
import PresentadorUnitario from "components/PresentadorUnitario.vue";
import ButtonGroup from "components/ButtonGroup.vue";
import ModalCancelar from "components/ModalCancelar.vue";
import HelpableInput from "components/Helpables/HelpableInput.vue";
import {ReciboCajaEntity} from "src/entities/ReciboCajaEntity";
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import {useQuasar} from "quasar";


const $q = useQuasar();
const modal = ref(false);
const stickyHeight = ref(0);

const newRecibo = ref(new ReciboCajaEntity({}));

function selectCliente() {
  $q.dialog({
    component: TercerosModalSelector,
  }).onOk((cliente: any) => {
    if (cliente.clienteID) {
      newRecibo.value.recibidoDe = cliente.clienteID;
    } else {
      newRecibo.value.recibidoDe = cliente.proveedorID;
    }
    newRecibo.value.recibidoDeNombre = cliente.nombre;
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
