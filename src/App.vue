<template>
  <div id="app">
    <main>
      <transition name="fade">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
import firebaseInstance from './util/firebase'
import router from './router'

export default {
  name: 'App',
  data () {
    return {
      test: 'test'
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
    console.log('* App.vue loaded')
  }
}
</script>

<style lang="scss">
  @import "./styles/util_classes.scss";
  @import "./styles/settings.scss";
  @import "./styles/buttons.scss";

  * {
    box-sizing: border-box;
    outline: none;
  }

  body, a, p, div, span, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    cursor: pointer;
  }

  body {
    background-color: $backgroundColor;
  }

  html {
  }

  #app {
    padding: 100px;
  }

</style>
