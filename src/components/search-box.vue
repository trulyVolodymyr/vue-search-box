<template>
  <div @keydown.down="state.moveDown" @keydown.up="state.moveUp">
    <form class="form" @submit.prevent>
      <input
        class="input"
        type="search"
        list="words"
        v-model="state.enteredWord"
        @keydown.enter="state.setWord"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.delete="state.deleteSymbol"
      />
      <div class="advise">
        {{ state.advisedWord }}
      </div>
      <div v-show="state.hidelist" class="options">
        <ul class="options__list" ref="scrollContainer">
          <li
            ref="options"
            v-for="(word, index) in state.filteredWords"
            :key="word"
            class="options__item"
            @mouseover="state.selected = index"
            @mouseout="state.selected = false"
            :class="{ selected: state.selected === index }"
            @click="state.enteredWord = word"
          >
            {{ word }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useWords } from '../stores/words'
const state = useWords()

const scrollContainer = ref(null)
const options = ref(null)

const fixScrolling = () => {
  const liH = options.value[state.arrowCounter].clientHeight
  scrollContainer.value.scrollTop = liH * state.arrowCounter
}

const onArrowDown = () => {
  if (state.arrowCounter < state.filteredWords.length - 1) {
    state.arrowCounter = state.arrowCounter + 1
    fixScrolling()
  }
}

const onArrowUp = () => {
  if (state.arrowCounter > 0) {
    state.arrowCounter = state.arrowCounter - 1
    fixScrolling()
  }
}

onMounted(() => {
  state.generateWords()
})
onUpdated(() => {
  state.filterWords()
  state.updateSelected()
  state.updateArrowCounter()
})
</script>
