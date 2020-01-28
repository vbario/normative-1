import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        stationInformation: [],
        stationStatus: []
      },
      actions,
      mutations,
      getters,
      strict: debug
})
