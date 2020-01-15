<template>
  <div class="df jcc aic">
    <p>{{ shownDate }}</p>
  </div>
</template>

<script>
import CampaignCard from './CampaignCard'
import OrderCard1 from './OrderCard1'

export default {
  name: 'Countdown',
  data () {
    return {
      shownDate: ''
    }
  },
  props: ['date'],
  components: {
  },
  methods: {
    timeFromDate (date) {
      var startDate = new Date(date)
      var endDate = new Date()
      var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

      return this.timeFormat(seconds)
    },
    timeFormat (seconds) {
      var sec_num = parseInt(seconds, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    },
  },
  computed: {

  },
  created () {
    var date = new Date(this.date)
    this.shownDate = this.timeFromDate(date)
    this.counter = setInterval(()=>{
      date = new Date(this.date)
      this.shownDate = this.timeFromDate(date)
      console.log('---')
    }, 1000)
    // console.log('** Login Component Loaded')
  },
  beforeDestroy () {
    clearInterval(this.counter)
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
</style>

