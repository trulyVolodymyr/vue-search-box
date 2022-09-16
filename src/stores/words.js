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
    sortedWords: (state) => state.words.sort((a, b) => a.localeCompare(b)),
    filteredWords: (state) => state.filterWords(),
  },

  actions: {
    filterWords() {
      let res = []
      for (var i = 0; i < this.sortedWords.length; i++) {
        if (
          this.sortedWords[i].startsWith(this.enteredWord) &&
          this.enteredWord != ''
        ) {
          res.push(this.sortedWords[i])
        }
      }
      this.advisedWord = res[0]
      return res
    },
    generateWords() {
      for (let k = 0; k < 50000; k++) {
        //1 OPTION
        //
        //
        // let result = Math.random().toString(36).slice(2, 7)
        //2 OPTION
        //
        //
        let result = ''
        const characters = 'abcdefghijklmnopqrstuvwxyz'
        let charactersLength = characters.length
        for (let i = 0; i < 8; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          )
        }
        this.words.push(result)
      }
      // 3 OPTION
      //
      // this.words = this.words = Array.from({ length: 50000 }, () =>
      //   Math.random().toString(36).slice(2, 9)
      // )
    },
    setWord() {
      this.enteredWord = this.advisedWord
    },
  },
})
