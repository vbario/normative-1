<template>
  <div class="df fdc">
    <h2>Create your account</h2>
    <input v-model="fullName" class="input-landing" type="text" placeholder="Full Name"/>
    <input v-model="email" class="input-landing" type="email" placeholder="Email Address"/>
    <input v-model="password" class="input-landing" type="password" placeholder="Password"/>
    <button class="button-landing" v-on:click="register()">Register</button>
    <p v-if="$store.getters.authError" class="login-register-error">{{ $store.getters.authError }}</p>
    <p class="account-caption">Already have an account? <router-link :to="'/login'">Sign in</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      fullName: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        fullName: this.fullName
      })
    }
  },
  computed: {

  },
  created () {
    console.log('** Register Component Loaded')
    this.$store.dispatch('clearAuthError', {})
  }
}
</script>

<style scoped lang="scss">
h2 {
  color: #f1646a;
  font-weight: 500;
  margin-bottom: 30px;
  align-self: center;
}
</style>
