<template>
  <div class="df fdc jcc aic">
    <h2>Log in to your account</h2>
    <input v-model="email" class="input-landing" type="email" placeholder="Email Address"/>
    <input v-model="password" class="input-landing" type="password" placeholder="Password"/>
    <p class="forgot-password"><router-link :to="'/forgotPassword'">Forgot Password?</router-link></p>
    <button class="button-landing" v-on:click="login()">Log in</button>
    <p v-if="$store.getters.authError" class="login-register-error">{{ $store.getters.authError }}</p>
    <p class="account-caption">Don't have an account? <router-link :to="'/register'">Sign up</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
    login () {
      // if (this.$refs.form.validate()) {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      // }
    }
  },
  computed: {

  },
  created () {
    console.log('** Login Component Loaded')
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

.forgot-password {
  color: #0874D8;
  font-size: 12px;
  font-weight: 500;
}
</style>
