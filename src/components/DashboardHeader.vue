<template>
  <div class="header-full-width">
    <div class="header df fdc jcsb">

      <!-- TOP BAR - BAR -->
      <div class="top-section df fdr jcsb">
        <!-- User thumbnail/name -->
        <span class="df fdr jcc aic menu-toggle" v-on:click="goTo('/home')">
          <h1 class="f1 df aic">Super Coffee</h1>

          <!-- Alternate links implementation -->
          <div class="links2 df fdr" v-if="false">
            <span v-on:click="goTo('/home')" v-bind:class="{'current-page': dashboardPage == 'home'}"><p>My Actions</p></span>
            <span v-on:click="goTo('/friends')" v-bind:class="{'current-page': dashboardPage == 'projects'}"><p>Friends</p></span>
            <span v-on:click="goTo('/explore')" v-bind:class="{'current-page': dashboardPage == 'company'}"><p>Explore</p></span>
            <span v-on:click="goTo('/main')" v-bind:class="{'current-page': dashboardPage == 'main'}"><p>Main</p></span>
            <span v-on:click="goTo('/barista')" v-bind:class="{'current-page': dashboardPage == 'barista'}"><p>Barista</p></span>
          </div>
        </span>

        <h3 class="f1 df aic jcc">{{ pageTitle() }}</h3>

        <!-- User thumbnail/name -->
        <span class="df fdr jcc aic menu-toggle" v-on:click="toggleProfileMenu()">
          <img class="profile-image profile-image-smaller" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
          <p class="name-profile">{{ $store.getters.userData.fullName }}</p>
          <img class="chevron-down" src="../../static/images/arrow-red-active-down.svg" alt="">
        </span>


      </div>

      <!-- USER LINKS -->
      <div v-if="$store.getters.userType == ''" class="links df fdr">
        <span v-on:click="goTo('/home')" v-bind:class="{'current-page': dashboardPage == 'home'}"><p>My Actions</p></span>
        <span v-on:click="goTo('/friends')" v-bind:class="{'current-page': dashboardPage == 'projects'}"><p>Friends</p></span>
        <span v-on:click="goTo('/explore')" v-bind:class="{'current-page': dashboardPage == 'company'}"><p>Explore</p></span>
        <span v-on:click="goTo('/main')" v-bind:class="{'current-page': dashboardPage == 'main'}"><p>Main</p></span>
      </div>

      <!-- BAR LINKS -->
      <div v-if="($store.getters.userType == 'bar') && (dashboardPage == 'home')" class="links df fdr">
        <span v-on:click="goTo('/barista')" v-bind:class="{'current-page': dashboardPage == 'barista'}"><p>Barista</p></span>
        <span v-on:click="goTo('/server')" v-bind:class="{'current-page': dashboardPage == 'server'}"><p>Server</p></span>
      </div>

      <!-- USER MENU -->
      <div v-if="showProfileMenu" class="profile-menu df fdc jcsb">
        <div class="identity df fdr jcsb">
          <img class="profile-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
          <div class="user-details df fdc jcc">
            <span class="full-name">
              <p>
                {{ $store.getters.userData.fullName }}
              </p>
            </span>
            <span class="e-mail">
              <p>
                {{ $store.getters.userData.email }}
              </p>
            </span>
          </div>
        </div>
        <div class="profile-menu-links">
          <!-- <span class="view-profile" v-on:click="goToProfile()">
            <p>
              View Profile
            </p>
          </span> -->
          <!-- <span>
            <p>
              Change Plan
            </p>
          </span> -->
          <span v-on:click="signOut()">
            <p>
              Sign Out
            </p>
          </span>
        </div>
      </div>
      <!-- <div v-if="!$store.getters.userData.emailVerified" class="verify-email df fdc jcc">
        Your e-mail is not verified. Check your mailbox for the verification e-mail.
      </div> -->
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'DashboardHeader',
  data () {
    return {
      showProfileMenu: false
    }
  },
  props: ['dashboardPage', 'headerMode'],
  components: {

  },
  methods: {
    pageTitle () {
      console.log('pageTitle2', this.$store.getters.userType, this.dashboardPage)
      if (this.$store.getters.userType == 'bar') {
        if (this.dashboardPage == 'home') {
          return 'Bar Control'
        } else if (this.dashboardPage == 'barista') {
          return 'Orders'
        } else if (this.dashboardPage == 'server') {
          return 'Server'
        }
      } else {
        if (this.dashboardPage == 'home') {
          return 'Home'
        } else if (this.dashboardPage == 'main') {
          return 'Main'
        } else if (this.dashboardPage == 'server') {
          return 'Server'
        }
      }
    },
    goTo (path) {
      router.push(path)
    },
    toggleProfileMenu () {
      this.showProfileMenu = !this.showProfileMenu
    },
    signOut () {
      this.$store.dispatch('logout', {})
    },
    goToProfile () {
      this.showProfileMenu = false
      this.goTo('/profile')
    }
  },
  computed: {

  },
  created () {
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  align-self: center;
  /*background-color: #232E37;*/
  padding: 0px 48px 0px;
  position: relative;
  max-width: 1280px;
}

.header2 {
  padding: 10px 48px 0px;
}

.links {
  /*background-color: #fff;*/
}

.links > span {
  margin-right: 20px;
  height: 48px;
  /*width: 33%;*/
  flex: 1;

  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  height: 400px;

  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  margin-top: 5px;
  border-bottom: 5px solid transparent;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }

  & > p {
    font-size: 34px;
    text-transform: uppercase;
    color: #111111;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    cursor: pointer;
  }
}

.links > .current-page {
  border-bottom: 5px solid #DD5050;
}

.links2 > span {
  margin-right: 30px;

  & > p {
    color: white;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 24px;
    text-transform: uppercase;
  }
}

.logo {
  width: 86px;
  position: absolute;
  top: 21px;
  left: 50%;
  transform: translateX(-50%);
}

.logo-small {
  width: 25px;
  height: 25px;
  object-fit: contain;
  object-position: center;
  margin-right: 20px;
}

.name-profile {
  color: white;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.46px;
  line-height: 16px;
  color: #010101;
  margin-left: 10px;
}

.chevron-down {
  margin-left: 10px;
}

.profile-menu {
  position: absolute;
  width: 300px;
  border-radius: 8px;
  left: 50px;
  top: 50px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.28);
  z-index: 100;
}

.identity {
  padding: 15px 30px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: white;
  border-bottom: 1px solid #aaa;
}

.user-details {
  flex: 1;
  padding-left: 20px;
}

.profile-image {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.profile-image-smaller {
  width: 50px;
  height: 50px;
}

.full-name {
  font-size: 20px;
  font-weight: 700;
}

.e-mail {
  font-size: 12px;
  font-weight: 500;
  color: #DD5050;
}

.profile-menu-links {
  padding-bottom: 10px;
  padding-top: 10px;

  & > span {
    cursor: pointer;
    padding: 15px 30px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;

    & > * {
      cursor: pointer;
    }

    &:hover {
      background-color: white;
      color: #2c74dc;
    }
  }
}

.view-profile {
  /*background-color: white;*/
  /*color: #2c74dc;*/
}

.verify-email {
  /*min-height: 40px;*/
  padding: 15px;
  background-color: #faffae;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
}

.header-full-width {
  /*position: absolute;*/
  top: 0;
  left: 0;
  /*height: 100px;*/
  width: 100vw;
  /*background-color: grey;*/
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  /*background-color: #232E37;*/
  /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.29);*/
}

.top-section {
  padding: 15px 0;
}

.bp-logo {
  object-fit: contain;
}

.menu-toggle {
  cursor: pointer;
  width: 222px;

  & > * {
    cursor: pointer;
  }

  &:hover {
    /*opacity: 0.8;*/
  }
}

.middle-section {
  margin-bottom: 30px;
}

</style>
