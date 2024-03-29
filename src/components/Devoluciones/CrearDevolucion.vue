<template>
  <q-card flat>
    <q-card-section :style="{'padding-bottom': stickyHeight + 'px'}">
      <div class="row items-center">
        <span class="titulo-pagina">Devolucion</span>
        <q-space/>
        <span class="comprobante">ID Devolucion: {{ newDevolucion.id }}</span>
      </div>
      <br>
      <presentador>
        <helpable-input help-key="devolucion:item">
          <q-input v-model="selectedItem.descripcion" label="Item" readonly @click="selectItem"/>
        </helpable-input>
        <helpable-input help-key="devolucion:cantidad">
          <q-input ref="cantidadHTML" v-model.number="cantidad" label="Cantidad" placeholder="Ingrese cantidad"
                   type="number">
            <template v-slot:append>
              <q-select v-if="selectedItemType == 'ITEM'" v-model="cantidadUnidad" :options="cantidadOptions"
                        emit-value map-options/>
            </template>
          </q-input>
        </helpable-input>
        <helpable-input help-key="devolucion:descuento">
          <q-input v-model="descuento" label="Descuento" placeholder="Ingrese descuento">
            <template v-slot:append>
              <q-select v-model="descuentoType" :options="['%', '$']"/>
            </template>
          </q-input>
        </helpable-input>
        <template #action>
          <helpable-btn help-key="devolucion:agregarItem">
            <q-btn class="advance-btn" label="Agregar item" @click="sell"/>
          </helpable-btn>
        </template>
      </presentador>
      <br>
      <responsive-table :actions="[
          {icon: 'delete', onClick: (item, itemIndex)=>{
            newDevolucion.detalles.splice(itemIndex, 1)
          }, class: 'revert-btn'}
        ]" :data="newDevolucion.detalles" :schema="esquema" title="Items">
      </responsive-table>
      <br>
      <div v-intersection="onTotalOculto" class="col-auto row items-end justify-end relative-position">
        <q-resize-observer v-if="$q.platform.is.mobile" @resize="({height})=>{stickyHeight = height}"/>
        <span
          class="col-auto q-pa-sm item-bordered shadow-2 total"><b>Total devolucion: ${{
            presentCurrency(total)
          }}</b></span>
      </div>
      <br>
      <presentador>
        <helpable-input help-key="devolucion:fecha">
          <q-input v-model="newDevolucion.fecha" label="Fecha">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                  <q-date v-model="newDevolucion.fecha" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close"/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </helpable-input>
        <helpable-input help-key="devolucion:fechaVencimiento">
          <q-input v-model="newDevolucion.fechaVencimiento" label="Fecha Vencimiento">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy ref="qDateProxy" cover transition-hide="scale" transition-show="scale">
                  <q-date v-model="newDevolucion.fechaVencimiento" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close"/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </helpable-input>
      </presentador>
      <br>
      <presentador>
        <helpable-input help-key="devolucion:terceroID">
          <q-input label="Nit/CC" v-model="newDevolucion.clienteID" readonly @click="selectCliente"/>
        </helpable-input>
        <helpable-input help-key="devolucion:nombre">
          <q-input label="Nombre" v-model="newDevolucion.clienteNombre" readonly/>
        </helpable-input>
        <helpable-input help-key="devolucion:tipoPago">
          <q-select label="Tipo Pago" v-model="newDevolucion.tipoPago" :options="['Efectivo', 'Credito']"/>
        </helpable-input>
      </presentador>
      <br>
      <button-group :btns="[
            {
              label: 'Cancelar',
              fn: ()=>{
                $q.dialog({
                component: ModalCancelar,
                componentProps: {
                  mensaje: '¿Seguro que quieres cancelar?'
                }
                }).onOk(payload => {x
                  $q.notify('Devolucion cancelada');
                  resetData();

                }).onCancel(() => {
                  $q.notify('Cancelado');
                });
              },
              class: 'revert-btn shadow-10'
            },
            {
              label: 'Guardar',
              fn: saveDevolucion
            }
            ]"/>
    </q-card-section>
  </q-card>
  <q-page-sticky v-if="!totalVisible" expand position="bottom">
      <span
        class="shadow-2 total bg-white full-width text-center"><b>Total devolucion: ${{
          presentCurrency(total)
        }}</b></span>
  </q-page-sticky>
</template>

<script lang="ts" setup>
import {computed, Ref, ref} from 'vue';
import ModalCancelar from "components/ModalCancelar.vue";
import Presentador from "components/Presentador.vue";
import ButtonGroup from "components/ButtonGroup.vue";
import ResponsiveTable from "components/ResponsiveTable.vue";
import HelpableInput from "components/Helpables/HelpableInput.vue";
import ItemsModalSelector from "components/Items/ItemsModalSelector.vue";
import {QInput, useQuasar} from "quasar";
import {MeasureEngine} from "src/api/Items/MeasureEngine";
import {presentCurrency} from "src/api/utils/CurrencyFormat";
import {ResponsiveTableSchemaField} from "src/api/interfaces/ResponsiveTableInterfaces";
import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {ItemEntity} from "src/entities/ItemEntity";
import {DevolucionEntity} from "src/entities/DevolucionEntity";
import {uid} from "quasar";
import TercerosModalSelector from "components/Terceros/TercerosModalSelector.vue";
import {useDevolucionStore} from "src/store/Devolucion/devolucionStore";
import HelpableBtn from "components/Helpables/HelpableBtn.vue";
import {ServicioEntity} from "src/entities/ServicioEntity";
import {ApiController} from "src/api/ApiController";

const $q = useQuasar();
const stickyHeight = ref(0);
const cantidadHTML: Ref<QInput | null> = ref(null);
const devolucionStore = useDevolucionStore();

const newDevolucion: Ref<DevolucionEntity> = ref(new DevolucionEntity({id: uid()}));

const cantidadOptions = ref([{
  label: "",
  value: ""
}]);

const cantidadUnidad = ref('');

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
const selectedItem = ref<ItemEntity | ServicioEntity>(new ItemEntity({}));
const selectedItemType = ref("ITEM");

function selectItem() {
  $q.dialog({
    component: ItemsModalSelector,
    componentProps: {
      itemsOnly: false
    }
  }).onOk((item: ItemEntity | ServicioEntity) => {
    selectedItem.value = item;
    selectedItemType.value = item.type;
    switch (item.type) {
      case "ITEM":
        cantidadOptions.value = Object.entries(MeasureEngine.instance().getUnits((item as ItemEntity).dimension)).map((value) => {
          return {label: value[1].symbol, value: value[0]};
        });
        const baseUnit = MeasureEngine.instance().dimensions[(item as ItemEntity).dimension].baseUnit;
        cantidadUnidad.value = MeasureEngine.instance().getUnits((item as ItemEntity).dimension)[baseUnit].symbol;
        break;
    }
    setTimeout(() => {
      cantidadHTML.value!.focus();
      cantidadHTML.value!.select();
    }, 100)
  });
}

function selectCliente() {
  $q.dialog({
    component: TercerosModalSelector,
  }).onOk((cliente: any) => {
    if (cliente.clienteID) {
      newDevolucion.value.clienteID = cliente.clienteID;
    } else {
      newDevolucion.value.clienteID = cliente.proveedorID;
    }
    newDevolucion.value.clienteNombre = cliente.nombre;
  });
}

const cantidad = ref(0);
const descuento = ref(0);
const descuentoType = ref('%');

function sell() {
  let descuentoLocal = '0%';
  let total = selectedItem.value.precio * cantidad.value;
  if (descuento.value !== 0) {
    if (descuentoType.value === '%') {
      total -= total * (descuento.value / 100);
      descuentoLocal = `${descuento.value}%`
    } else {
      total -= descuento.value;
      descuentoLocal = `$${descuento.value}`
    }
  }
  if (selectedItem.value.type === "ITEM") {
    let item: ItemEntity = <ItemEntity>selectedItem.value;
    newDevolucion.value.detalles.push({
      codigo: item.codigo,
      item: item.descripcion,
      impuesto: item.impuesto,
      precio: item.precio,
      costo: item.costeUnitario,
      descuento: descuentoLocal,
      cantidad: cantidad.value,
      total: total,
      costoTotal: item.costeUnitario * cantidad.value,
      type: "ITEM"
    });
  } else {
    let item: ServicioEntity = <ServicioEntity>selectedItem.value;
    newDevolucion.value.detalles.push({
      codigo: item.codigo,
      item: item.descripcion,
      impuesto: item.impuesto,
      precio: item.precio,
      costo: 0,
      descuento: descuentoLocal,
      cantidad: cantidad.value,
      total: total,
      costoTotal: 0,
      type: "SERVICIO"
    });
  }
  selectedItem.value = new ItemEntity({});
  cantidad.value = 0;
  descuento.value = 0;
}

const total = computed(() => {
  let totalLocal = 0;
  newDevolucion.value.detalles.forEach((row) => {
    totalLocal += row.total;
  });
  return totalLocal;
})

const totalVisible = ref(true);

function onTotalOculto(entry: any) {
  totalVisible.value = entry.isIntersecting;
}

const nombre: Ref<string> = ref('');

function resetData() {
  newDevolucion.value = new DevolucionEntity({});
  selectedItem.value = new ItemEntity({});
  cantidad.value = 0;
  descuento.value = 0;
  nombre.value = '';
}

function saveDevolucion() {
  let costoTotal = 0;
  let totalItems = 0;
  let totalServicios = 0;
  for (const item of newDevolucion.value.detalles) {
    costoTotal += item.costoTotal ? item.costoTotal : 0;
    switch (item.type) {
      case "ITEM":
        totalItems += item.total;
        break;
      case "SERVICIO":
        totalServicios += item.total;
        break;
    }
  }
  newDevolucion.value.costoTotal = costoTotal;
  newDevolucion.value.total = total.value;
  newDevolucion.value.totalItems = totalItems;
  newDevolucion.value.totalServicios = totalServicios;
  const errors = devolucionStore.validateDevolucion(newDevolucion.value);
  if (errors.length > 0) {
    errors.forEach(error => {
      $q.notify(error);
    });
  } else {
    try {
      devolucionStore.registerDevolucion(newDevolucion.value);
      const response = ApiController.post("/devolucion", newDevolucion.value);
      newDevolucion.value = new DevolucionEntity({id: uid()});
      $q.notify("Devolucion guardada exitosamente");
    } catch (e) {
      console.log(e);
    }
  }
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
