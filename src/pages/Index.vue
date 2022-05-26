<template>
  <q-page class="row">
    <q-dialog v-model="modal">
      <q-card>
        <q-card-section>
          <q-input class="col" label="Nombre"/>
          <q-input class="col" label="Codigo"/>
          <q-btn label="Seleccinar"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <q-stepper
        ref="stepper"
        v-model="step"
        animated
        color="primary"
        vertical
      >
        <q-step
          :done="step > 1"
          :name="1"
          icon="settings"
          title="Venta"
        >
          <div class="row q-gutter-md">
            <q-input class="col" label="Producto" @click="modal=true">
              <template v-slot:append>
                <q-icon name="info">
                  <q-tooltip class="text-body2">
                    Producto a vender
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-input class="col" label="Cantidad">
              <template v-slot:append>
                <q-icon name="info">
                  <q-tooltip class="text-body2">
                    Cantidad del producto a vender
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <br>
          <div class="row q-gutter-md">
            <q-input v-model="descuento" class="col" label="Descuento" stack-label/>
            <div class="col row items-center justify-center">
              <q-btn class="full-width" label="Añadir"/>
            </div>
          </div>
          <br>
          <!--          <q-table-->
          <!--            :columns="columns"-->
          <!--            :rows="rows"-->
          <!--            row-key="codigo"-->
          <!--            title="Venta"-->
          <!--            grid-->
          <!--          >-->
          <!--          </q-table>-->
          <q-expansion-item v-for="row in rows" :label="row.item">
            <div class="row">
              <div class="col">Codigo</div>
              <div class="col">{{ row.codigo }}</div>
            </div>
            <div class="row">
              <div class="col">Precio</div>
              <div class="col">{{ row.precio }}</div>
            </div>
            <div class="row">
              <div class="col">Descuento</div>
              <div class="col">{{ row.descuento }}</div>
            </div>
            <div class="row">
              <div class="col">Impuesto</div>
              <div class="col">{{ row.impuesto }}</div>
            </div>
            <div class="row">
              <div class="col">Cantidad</div>
              <div class="col">{{ row.cantidad }}</div>
            </div>
            <div class="row">
              <div class="col">Total</div>
              <div class="col">{{ row.total }}</div>
            </div>
          </q-expansion-item>
        </q-step>

        <q-step
          :done="step > 2"
          :name="2"
          icon="create_new_folder"
          title="Información de la venta"
        >
          <div class="column q-gutter-sm">
            <div class="col row q-gutter-sm">
              <q-input v-model="date" :rules="['date']" label="Fecha" mask="date">
                <template v-slot:append>
                  <q-icon class="cursor-pointer" name="event">
                    <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup color="primary" flat label="Close"/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col row q-gutter-sm">
              <q-input class="col" label="Nit"/>
              <q-input class="col" label="Nombre"/>
            </div>
            <div class="col row q-gutter-sm">
              <q-input class="col" label="Tipo de pago"/>
              <q-input class="col" label="Fecha de vencimiento"/>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn :label="step === 2 ? 'Guardar' : 'Continuar'" color="primary" @click="$refs.stepper.next()"/>
            <q-btn v-if="step > 1" class="q-ml-sm" color="primary" flat label="Retroceder"
                   @click="$refs.stepper.previous()"/>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const step = ref(1);
const date = ref("");
const descuento = ref(0);
const modal = ref(false);

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

const rows = [
  {
    item: 'Caja de galletas la fina',
    codigo: "3456465785",
    precio: 3400,
    descuento: 0,
    impuesto: 19,
    cantidad: 4,
    total: 12300
  }
]
</script>
