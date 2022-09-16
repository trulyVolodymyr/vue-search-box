<template>
  <div>
    <form class="form" @submit.prevent>
      <input
        class="input"
        type="search"
        list="words"
        v-model="state.enteredWord"
        @keydown.enter="state.setWord"
      />
      <div class="advise">
        {{ state.advisedWord }}
      </div>
      <datalist id="words">
        <option
          v-for="word in state.filteredWords"
          :key="word"
          :value="word"
        ></option>
      </datalist>
    </form>
  </div>
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'
import { useWords } from '../stores/words'
const state = useWords()

onMounted(() => state.generateWords())
onUpdated(() => state.filterWords())
</script>
