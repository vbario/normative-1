import router from '../router'
import axios from 'axios'

export const actions = {
  getStationInformation (state, item) {
    console.log('getStationInformation action', item)

    axios.get(item.url)
      .then(function (response) {
        console.log('getStationInformation response', response)
        state.commit('UPDATE_STATION_INFORMATION', response.data.data.stations)
      })
      .catch(function (error) {
        console.log('getStationInformation error', error)
      });

  },
  getStationStatus (state, item) {
    console.log('getStatioStatus action', item)

    axios.get(item.url)
      .then(function (response) {
        console.log('getStationStatus response', response)
        state.commit('UPDATE_STATION_STATUS', response.data.data.stations)
      })
      .catch(function (error) {
        console.log('getStationStatus error', error)
      });
  }
}
