import { defineStore } from 'pinia'

export const useWords = defineStore('words', {
  state: () => {
    return {
      words: [],
      advisedWord: '',
      enteredWord: '',
    }
  },

  getters: {
    filteredWords: (state) => state.filterWords(),
  },

  actions: {
    filterWords() {
      let res = this.words.filter((word) => {
        if (
          word.startsWith(this.enteredWord.trim()) &&
          this.enteredWord != ''
        ) {
          return word
        }
      })
      this.advisedWord = res[0]
      return res
    },
    generateWords() {
      this.words = this.words = Array.from({ length: 50000 }, () =>
        Math.random().toString(36).slice(2, 11)
      )
    },
    setWord() {
      this.enteredWord = this.advisedWord
    },
  },
})
