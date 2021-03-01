import { SET_SINGER } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  singer: {}
})

// getters
const getters = {
  singer: state => {
    return state.singer
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  [SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
