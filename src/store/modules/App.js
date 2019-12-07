// initial state
const state = {
    currentBoard: 'Data',
    indexData: null,
    currentStock: {name: '', code: ''},
    historyStock: [],
    tradeMark: null,
    isDisplayTradeMark: false,
}

// getters
const getters = {
    getAll(state){
        return state
    },
    currentBoard(state){
        return state.currentBoard
    },
    indexData(state){
        return state.indexData
    },
    currentStock(state){
        return state.currentStock
    },
    historyStock(state){
        return state.historyStock
    },
    tradeMark(state){
        return state.tradeMark
    },
    isDisplayTradeMark(state){
        return state.isDisplayTradeMark
    }
}

// mutations
const mutations = {
  setValue(state, o){
    state[o.key] = o.value
  },
  addHistoryStock(state, o) {
      let i = state.historyStock.findIndex((i)=>i.code === o.code)
      if (i === -1) {
          state.historyStock.unshift(o)
      } else {
          state.historyStock.splice(i, 1)
          state.historyStock.unshift(o)
      }
      if (state.historyStock.length > 20) {
          state.historyStock.pop()
      }
  },
  clear(state){
      state.currentBoard = 'Data'
      state.indexData = null
      state.currentStock = {name: '', code: ''}
      state.historyStock = []
      state.tradeMark = null
      state.isDisplayTradeMark = false
  },
}

// actions
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
