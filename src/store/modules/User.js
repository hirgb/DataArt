// initial state
const state = {}

// getters
const getters = {
    getAll(state) {
        return state
    },
}

// mutations
const mutations = {
    setValue(state, o) {
        state[o.key] = o.value
    },
    clear(state) {
        for(let key in state) {
            delete state[key]
        }
    },
}

// actions
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
