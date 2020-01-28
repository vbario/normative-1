<template>
  <div class="df fdc aic jcc">
    <button @click="getStationData" class="_bss1">
      Get Bike Station Data
    </button>
    <StationsList />
  </div>
</template>

<script>
import StationsList from './StationsList'

export default {
  name: 'Home',
  data () {
    return {
      sortBy: ''
    }
  },
  props: [],
  components: {
    StationsList
  },
  methods: {
    getStationData () {
      this.$store.dispatch('getStationInformation', {
        url: 'https://toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_information'
      })
      this.$store.dispatch('getStationStatus', {
        url: 'https://toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_status'
      })
    }
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
</style>
