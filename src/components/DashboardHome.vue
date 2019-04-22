<template>
  <div class="wrap page1 f1 df">
    <div class="wrap-inner f1 df fdr">
      Home
      <!-- <News/> -->
    </div>
  </div>
</template>

<script>
// import News from './News'
export default {
  name: 'DashboardHome',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: [],
  components: {
  },
  methods: {

  },
  computed: {

  },
  created () {
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
.wrap-inner {
  /*background-image: url('../../static/images/news-bg.svg');*/
  background-position: center;
  -webkit-background-size: contain;
  background-size: contain;
  background-repeat: no-repeat;
  /*justify-content: flex-end;*/
}
.wrap {
  width: 100%;
}
</style>
