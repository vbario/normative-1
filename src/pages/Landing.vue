<template>
  <div class="wrapper df jcc aic">
    <div class="login-register df fdr jcc aic">
      <div class="landing-logo f2 df fdc jcc aic">
        BetterPlace
      </div>
      <div class="landing-login-register f3 df jcc aic">
        <Login v-if="mode == 'login'"/>
        <Register v-else-if="mode == 'register'"/>
        <ForgotPassword v-else-if="mode == 'forgotPassword'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'
import ForgotPassword from '../components/ForgotPassword'

export default {
  name: 'Landing',
  data () {
    return {
    }
  },
  props: ['mode'],
  components: {
    Login,
    Register,
    ForgotPassword
  },
  methods: {

  },
  computed: {

  },
  created () {
    console.log('* Loaded landing page')
    console.log('* Landing page mode:', this.mode)
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    min-height: 100vh;
    background-image: url('../../static/images/landing-background.jpg');
    background-size: cover;
    background-position: center;
  }

  .login-register {
    width: 665px;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 40px 0 rgba(0,0,0,0.29);
  }

  .landing-logo {
    height: 100%;
    border-radius: 8px 0 0 8px;
    background: linear-gradient(0deg, #0764BB 0%, #0874D8 100%);
  }

  .landing-login-register {
    height: 100%;
    border-radius: 0 8px 8px 0;
    background-color: #FFFFFF;
  }

  .hourprice-logo {
    width: 150px;
    height: 150px;
    object-fit: contain;
    object-position: center;
  }
</style>
