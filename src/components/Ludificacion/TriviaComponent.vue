<template>
  <q-card>
    <q-card-section class="row items-center justify-center">
      <span class="col text-center">
        {{ question.question }}
      </span>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <q-item :class="{
          'col': true, 'response-selector': true,  'q-ma-xs': true, 'correct-answer': select === 'a' && props.question.solution==='a', 'wrong-answer': select === 'a' && props.question.solution!=='a'
        }" clickable @click="selectAnswer('a')">
          <q-item-label>{{ question.a }}</q-item-label>
        </q-item>
        <q-item :class="{
          'col': true, 'response-selector': true,  'q-ma-xs': true, 'correct-answer': select === 'b' && props.question.solution==='b', 'wrong-answer': select === 'b' && props.question.solution!=='b'
        }" clickable @click="selectAnswer('b')">
          <q-item-label>{{ question.b }}</q-item-label>
        </q-item>
      </div>
      <div class="row">
        <q-item :class="{
          'col': true, 'response-selector': true,  'q-ma-xs': true, 'correct-answer': select === 'c' && props.question.solution==='c', 'wrong-answer': select === 'c' && props.question.solution!=='c'
        }" clickable @click="selectAnswer('c')">
          <q-item-label>{{ question.c }}</q-item-label>
        </q-item>
        <q-item :class="{
          'col': true, 'response-selector': true,  'q-ma-xs': true, 'correct-answer': select === 'd' && props.question.solution==='d', 'wrong-answer': select === 'd' && props.question.solution!=='d'
        }" clickable @click="selectAnswer('d')">
          <q-item-label>{{ question.d }}</q-item-label>
        </q-item>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {onBeforeUpdate, ref} from "vue";

const select = ref("");

const props = defineProps<{
  question: any
}>();

const selectAnswer = (index: string) => {
  select.value = index;
  if (props.question.solution === select.value) {
    emits("points", 50);
  } else {
    emits("points", 0);
  }
};

const emits = defineEmits<{
  (e: 'points', points: number): void
}>();

onBeforeUpdate(() => {
  select.value = "";
});

</script>

<style lang="scss" scoped>
.response-selector {
  border: #1D1D1D solid 1px;
}

.correct-answer {
  background: green;
  color: white;
}

.wrong-answer {
  background: red;
  color: white;
}

.incorrect-answer {

}
</style>
