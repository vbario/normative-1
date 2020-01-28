<template>
  <div class="stations-list-wrapper df fdc">
    <div class="stations-list df fdc">
      <span class="stations-list-row stations-list-header-row df jcsb">
        <span @click="sortByHeading('name')">
          <h3 class="curp _bss2">
            Station Name
          </h3>
        </span>
        <span @click="sortByHeading('bikes')">
          <h3 class="curp _bss2">
            Number of Bikes Available
          </h3>
        </span>
      </span>

      <StationsListRow v-for="(station, stationid) in sortedStationsList"
                      v-bind:name="station.name"
                      v-bind:bikes="$store.getters.stationStatus.filter((v => v.station_id == station.station_id))[0].num_bikes_available"
                      v-if="$store.getters.stationStatus.length > 0 && $store.getters.stationInformation.length > 0"/>
    </div>
  </div>
</template>

<script>
import StationsListRow from './StationsListRow'

export default {
  name: 'StationsList',
  data () {
    return {
      sortBy: '',
      sortDirectionAsc: true
    }
  },
  props: [],
  components: {
    StationsListRow
  },
  methods: {
    sortByHeading (heading) {
      if (this.sortBy == heading) {
        this.sortDirectionAsc = !this.sortDirectionAsc
      } else {
        this.sortBy = heading
        this.sortDirectionAsc = true
      }
    }
  },
  computed: {
    sortedStationsList: function () {
      var startingList = [...this.$store.getters.stationInformation]
      var startingStatus = [...this.$store.getters.stationStatus]

      if (this.sortBy == 'bikes') {
        return startingList.sort((a, b) => 
          {
            var _a = startingStatus.filter((v) => v.station_id == a.station_id)[0]
            var _b = startingStatus.filter((v) => v.station_id == b.station_id)[0]
            return _a.num_bikes_available < _b.num_bikes_available ? -1 * this.sortDirectionAsc : -1 * !this.sortDirectionAsc
          })
      } else if (this.sortBy == 'name') {
        return startingList.sort((a, b) => 
          {
            return a.name < b.name ? -1 * this.sortDirectionAsc : -1 * !this.sortDirectionAsc
          })
      } else {
        return startingList
      }
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .stations-list-wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
