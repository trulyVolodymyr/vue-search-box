import { defineStore } from 'pinia'

export const useWords = defineStore('words', {
  state: () => {
    return {
      words: [],
      advisedWord: '',
      enteredWord: '',
      selected: false,
      arrowCounter: -1,
    }
  },

  getters: {
    hoveredWord() {
      return this.filteredWords[this.selected]
    },
    hidelist: (state) => {
      if (state.enteredWord === state.filteredWords[0]) {
        state.selected = false
        return false
      } else {
        return true
      }
    },
    filteredWords: (state) => state.filterWords(),
  },

  actions: {
    updateSelected() {
      if (this.enteredWord === '') {
        this.selected = false
      }
    },
    updateArrowCounter() {
      if (this.enteredWord === '') {
        this.arrowCounter = -1
      }
    },
    filterWords() {
      let res = this.words.filter((word) => {
        if (
          word.startsWith(this.enteredWord.trim()) &&
          this.enteredWord.trim() != ''
        ) {
          return word
        }
      })
      if (!this.selected) {
        this.advisedWord = res[0]
      }

      return res
    },
    moveDown() {
      if (this.selected === false) {
        return (this.selected = 0)
      }
      if (
        this.selected !== false &&
        this.selected < this.filteredWords.length - 1
      ) {
        return this.selected++
      }
    },
    moveUp() {
      if (this.selected === false) {
        return (this.selected = 0)
      }
      if (this.selected !== false && this.selected > 0) {
        return this.selected--
      }
    },
    generateWords() {
      this.words = this.words = Array.from({ length: 50000 }, () =>
        Math.random().toString(36).slice(2, 9)
      )
    },
    deleteSymbol() {
      this.selected = false
      this.arrowCounter = -1
    },
    setWord() {
      if (!this.selected) {
        this.arrowCounter = -1
        this.enteredWord = this.advisedWord
      }
      if (this.selected) {
        this.arrowCounter = -1
        this.enteredWord = this.hoveredWord
      }
    },
  },
})
