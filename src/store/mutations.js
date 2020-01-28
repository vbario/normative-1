import { types } from './mutation-types'

export const mutations = {
  [types.UPDATE_STATION_INFORMATION] (state, item) {
    state.stationInformation = item
  },
  [types.UPDATE_STATION_STATUS] (state, item) {
    state.stationStatus = item
  }
}
