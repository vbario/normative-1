<template>
  <div class="">
      <Home />
  </div>
</template>

<script>
import Home from '../components/Home'

export default {
  name: 'Landing',
  data () {
    return {
    }
  },
  props: ['mode'],
  components: {
    Home
  },
  methods: {

  },
  computed: {

  },
  created () {
    console.log('* Landing.vue loaded')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
</style>
