<template>
  <q-card>
    <q-card-section class="column items-center justify-center">
      <span>Nivel de usuario</span>
      <br>
      <q-avatar color="javeriana" :class="{ shake: disabled }" size="50px">
        {{ level }}
      </q-avatar>
      <q-linear-progress dark stripe rounded size="40px" :value="store.getExpRatio" color="blue" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="black" :label="store.getExpLabel"/>
        </div>
      </q-linear-progress>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useLudificacionStore} from "src/store/ludificacionStore";
import {ref, watch} from "vue";

const store = useLudificacionStore();
const {level} = storeToRefs(store);
const disabled = ref(false);

const watcher = watch(level, () => {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 500);
});
</script>

<style lang="scss" scoped>
.shake {
  -webkit-animation: anvil 2s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  visibility: visible;
  z-index: 200;
  opacity: 1;
}

@keyframes anvil {
  0% {
    transform: scale(5) rotate(0);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    background: #F2C037;
  }
  50% {
    transform: scale(1) rotate(-0.2deg);
    opacity: 1;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0.5);
    background: #F2C037;
  }
  75% {
    transform: scale(1) rotate(0.2deg);
    opacity: 1;
    box-shadow: 0 0 250px rgba(241, 241, 241, 0.5);
    background: #2C5697;
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
    box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    background: #2C5697;
  }
}

#popup[data-pop="anvil"].show {
  -webkit-animation: anvil 1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  visibility: visible;
  z-index: 200;
  opacity: 1;
}

#popup[data-pop="anvil"].show ~ #overlay {
  opacity: 1;
  visibility: visible;
  z-index: 100;
}
</style>
