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
    getUserData () {
      var path = this.$route.path
      var _path = path.substr(1, path.lastIndexOf('/') - 1)
      var key = path.substr(path.lastIndexOf('/') + 1, path.length)

      console.log('before user data', this.$store.getters.uid)

      this.$store.dispatch('getUserData', {
        uid: this.$store.getters.uid,
        fullPath: path,
        path: _path,
        key: key
      }).then(() => {
        console.log('After getting user data', this.$store.getters.userData)
        // this.getCompanyData()
        // this.getMyProjects()
      })
    }
  },
  computed: {

  },
  created () {
    this.getUserData()
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
