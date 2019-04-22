<template>
  <div class="df fdc aic jcc">
    <h2>Forgot your password?</h2>
    <input v-model="email" class="input-landing" type="email" placeholder="Email Address"/>
    <button class="button-landing" v-on:click="recover()">Send Recovery E-mail</button>
    <p v-if="$store.getters.afterEmailRecovery" class="login-register-error">If your e-mail address exists in the system, you will receive a password recovery message.</p>
    <p class="account-caption">Already have an account? <router-link :to="'/login'">Sign in</router-link></p>
    <p class="account-caption">Don't have an account? <router-link :to="'/register'">Sign up</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
    recover () {
      // if (this.$refs.form.validate()) {
      this.$store.dispatch('forgotPassword', {
        email: this.email
      })
      // }
    }
  },
  computed: {

  },
  created () {
    console.log('** Forgot Password Component Loaded')
    this.$store.dispatch('clearAuthError', {})
  }
}
</script>

<style scoped lang="scss">
h2 {
  color: black;
  font-weight: 500;
  margin-bottom: 30px;
  align-self: center;
}
</style>
