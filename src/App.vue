<template>
  <div id="app">
    <main class="">
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
    checkLoginStatus () {
      firebaseInstance.auth().onAuthStateChanged((data) => {
        if (data) {
          console.log('Auth status: logged in')
          this.$store.dispatch('loggedIn', {
            uid: data.uid
          }).then(() => {
            this.getUserData()
          })
        } else {
          console.log('Auth status: not logged in')
          router.push('/login')
        }
      })
    },
    getUserData () {
      var path = this.$route.path
      var _path = path.substr(1, path.lastIndexOf('/') - 1)
      var key = path.substr(path.lastIndexOf('/') + 1, path.length)
      this.$store.dispatch('getUserData', {
        uid: this.$store.getters.uid,
        fullPath: path,
        path: _path,
        key: key
      }).then(() => {
        console.log('After getting user data', this.$store.getters.userType)

        if (this.$store.getters.userType == 'admin') {

        } else if (this.$store.getters.userType == 'bar') {
          this.$store.dispatch('watchBaristaOrders', {})
          this.$store.dispatch('getStoreStaff', {})
        } else {
          this.$store.dispatch('getMenu', {})
          this.$store.dispatch('watchActiveOrders', {
            uid: this.$store.getters.uid
          })
          this.$store.dispatch('watchMyFavorites', {
            userid: this.$store.getters.uid
          })
        }
      })
    },
    getMyProjects () {
      this.$store.dispatch('getMyProjects', {
        projectList: this.$store.getters.myProjectList
      }).then(() => {
        console.log('after getting my projects', this.$store.getters.uid)
      })
    },
    getCompanyData () {
      this.$store.dispatch('getCompanyInfo', {
        myCompany: this.$store.getters.userData.myCompany
      }).then(() => {
        console.log('After getting company data')
        // this.$forceUpdate();
      })
    }
  },
  computed: {

  },
  created () {
    console.log('* Loaded app root')
    this.checkLoginStatus()
  }
}
</script>

<style lang="scss">
  @import "./styles/settings.scss";

  * {
    box-sizing: border-box;
    outline: none;
  }

  body, a, p, div, span, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    cursor: default;
    font-family: 'Roboto', sans-serif;
  }

  a {
    color: #f1646a;
  }

  h2 {
    color: white;
  }

  h4 {
    color: #000000;
    font-size: 24px;
    line-height: 43px;
    margin-bottom: 30px;
    font-weight: 500;
  }

  body {
    background-color: #f5f5f5;
    /*min-width: 480px;*/
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  html {
    position: relative;
    min-height: 100%;
  }

  main {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }

  .page1 {
    padding: 50px;
  }

  .df {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }

  .fdc {
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
  }

  .fdr {
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
  }

  .jcfe {
    justify-content: flex-end;
  }

  .jcfs {
    justify-content: flex-start;
  }

  .jcc {
    justify-content: center;
  }

  .aic {
    -ms-align-items: center;
    align-items: center;
  }

  .jcsb {
    justify-content: space-between;
  }

  .f1 {
    flex: 1;
  }

  .f2 {
    flex: 2;
  }

  .f3 {
    flex: 3;
  }

  .f4 {
    flex: 4;
  }

  .f5 {
    flex: 5;
  }

  .f6 {
    flex: 6;
  }

  .f7 {
    flex: 7;
  }

  .f8 {
    flex: 8;
  }

  .f9 {
    flex: 9;
  }

  .f10 {
    flex: 10;
  }

  .mt0 {
    margin-top: 0 !important;
  }

  .tac {
    text-align: center;
  }

  .input-landing {
    width: 100%;
    height: 50px;
    /*border-radius: 4px;*/
    border: none;
    border-bottom: 2px solid #888;
    /*background-color: #f5f5f5;*/
    margin-bottom: 5px;
    padding: 20px;
    font-size: 16px;
    border-radius: 0;
  }

  .account-caption {
    margin-top: 30px;
    font-size: 12px;
    align-self: center;
  }

  .button-landing {
    font-weight: 600;
    width: 320px;
    height: 45px;
    border-radius: 20px;
    border: 0;
    background-color: #f1646a;
    color: white;
    font-size: 24px;
    text-transform: capitalize;
    border: 1px solid #f1646a;
    transition: all 0.4s;
    margin-top: 40px;

    &:hover {
      border: 1px solid #f1646a;
      background-color: white;
      color: #f1646a;
    }
  }

  .button-sidebar-2 {
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.64px;
    line-height: 25px;
    border: 0;
    background: none;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }

  .button-sidebar-2-active {
    color: #0874D8;
  }

  .button-sidebar {
    border: 0;
    padding: 8px 20px;
    color: #848484;
    font-size: 18px;
    line-height: 36px;
    font-weight: 500;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: flex-start;
    border-radius: 8px;
  }

  .button-sidebar-active {
    border: 0;
    padding: 8px 20px;
    background-color: #D9EDFF;
    color: #2C74DC;
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: flex-start;
    border-radius: 8px;
  }

  .input1 {
    border: none;
    padding: 20px;
    height: 65px;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.28);
    color: #000000;
    font-size: 18px;
    letter-spacing: 0.64px;
    line-height: 25px;

    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }

  .button-form {
    border: none;
    width: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: #D9EDFF;
    /*box-shadow: 0 1px 4px 0 rgba(0,0,0,0.32);*/
    color: #0874D8;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.5px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    opacity: 0.5;
  }

  .button-small {
    height: 30px;
    width: 100px;
    border-radius: 4px;
    background-color: #D9EDFF;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    padding: unset;
  }

  .button-smaller {
    height: 25px;
    width: 75px;
    font-size: 10px;
    text-transform: capitalize;
  }

  .button-deactivate {
    background-color: #eee;
    color: #999;
  }

  .button-form-active {
    opacity: 1;
  }

  .no-margin {
    margin: 0 !important;
  }

  .box {
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.28);
    background-color: white;
    border-radius: 10px;
  }

  .disabled-faded {
    opacity: 0.1;
  }

  .login-register-error {
    max-width: 75%;
    background-color: #fdeaea;
    border: 1px solid #f6bebf;
    padding: 4px;
    font-size: 12px;
    margin-top: 10px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    text-align: center;
    -ms-align-items: center;
    align-items: center;
    justify-content: center;
    align-self: center;
  }

  .search-bar {
    font-size: 16px;
    padding: 15px;
    margin-right: 40px;
    margin-left: 40px;
    border: none;
    background-color: #ddd;
    border-radius: 25px;
    margin-top: 20px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    text-align: center;
  }


.add-friends-row {
  justify-content: flex-end !important;

  & > p {
    background-color: #dbe8f0;
    border-radius: 22px;
    padding: 12px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    line-height: 1em;
    margin-right: 5px;
    margin-bottom: 10px;
    transition: all 0.5s;

    & > span {
      font-weight: 600;
      font-size: 1.5rem;
      margin-right: 10px;
      transform: translateY(-2px);
    }

    &:hover {
      background-color: #dedede;
      color: #555;
    }
  }
}

.button-action {
    border-radius: 25px;
    background-color: rgba(47,108,159,1);
    font-weight: 500;
    padding: 14px 30px;
    max-width: 320px;
    font-size: 18px;
    color: white;
    transition: all 0.5s;

    &:hover {
      background-color: #0069d9;
    }
}

.button-complete-action {
  background-color: #28a745;

  &:hover {
    background-color: #218838
  }
}

.posrel {
  position: relative;
}

.title-row {
  height: 70px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
}

.org-row {
  padding: 15px;
}

.menu-button {
  background-color: $color1;
  width: 100%;
  height: 80px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    color: white;
    font-size: 32px;
    font-weight: 500;
    cursor: pointer;
  }
}
.staff-button {
  width: 80px;
}
.serve-button {
  width: 160px;
}

.menu-button-selected {
  background-color: green;
}

.menu-button-color-2 {
  background-color: $color2;
}

.menu-button-color-3 {
  background-color: $color3;
}

.menu-button-color-4 {
  background-color: $color4;
}

.menu-button-color-5 {
  background-color: $color5;
}



.menu-button-color-espresso {
}

.menu-button-color-special {
  background-color: $color2;
}

.menu-button-color-cookie {
  background-color: $color3;
}

.menu-button-color-latte, .menu-button-color-cappucino {
  background-color: $color4;
}

.menu-button-color-5 {
  background-color: $color5;
}

.menu-preset {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;

  min-height: 85px;

  width: 100%;

  & > span {
    padding: 5px;
  }

  & > span:nth-child(1) {
    width: 100px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: flex-start;
    -ms-align-items: flex-start;
    align-items: center;
    margin-left: 0;
    width: 85px;
    /*background-color: grey;*/

    img {
      /*height: 85px;*/
      /*background-color: grey;*/
      /*border-radius: 50%*/
    }
  }

  & > span:nth-child(2) {
    /*width: 100px;*/
    flex: 1;
    .menu-preset-title {
      font-size: 22px;
    }
    .menu-preset-description {
      font-size: 16px;
    }
  }
}
.product-type-title {
  margin-bottom: 30px;
}

.product-type-extras {
  margin-bottom: 20px;
  color: #2c3e50;
}
.row-wrapper {
  width: 100%;

  .menu-button {
    /*margin-right: 10px;*/
    /*margin-left: 10px;*/
    
    &:first-child {
      /*margin-left: 0;*/
    }
    
    &:last-child {
      /*margin-right: 0;*/
    }
  }
}
.column-wrapper {
  width: 100%;

  & > .menu-button {
    /*margin-top: 10px;*/
    /*margin-bottom: 10px;*/
    
    &:first-child {
      /*margin-top: 0;*/
    }
    
    &:last-child {
      /*margin-bottom: 0;*/
    }
  }
  .row-wrapper {
    width: 100%;

    .menu-button {
      margin-right: 10px;
      margin-left: 10px;
      
      &:first-child {
        margin-left: 0;
      }
      
      &:nth-child(2) {
        margin-right: 0;
      }
    }
  }
}

input {
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 28px;
  color: white;
}

.half-button {
  width: 50%;
}


.quarter-button {
  width: 25%;
}

.no-background {
  background-color: transparent;
}

$color1: lighten(#E82405, 13);

.dropdown {
  border: none;
  border-radius: 0;
  color: white;
  font-size: 32px;
  font-weight: 500;

  & > * {
    border-radius: 0;
  }
}
.add {
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: $color1;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  color: white;
  position: absolute;
  left: calc(100% + 10px);
  top: 14px;

  /*transform: translate(0, -50%);*/
}
.cart {
  /*position: absolute;*/
  bottom: 0;
  background-color: white;
  width: 100%;
  /*max-width: 500px;*/
  /*height: 90%;*/
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  padding: 40px;
  /*opacity: 0;*/
}
.up-tab {
  z-index: 100;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 80px;
  height: 40px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background-color: white;
}

._s01 {
  margin-bottom: 10px;
}

._s1 {
  margin-bottom: 20px;
}

._s2 {
  margin-bottom: 40px;
}

.cart-item {
  margin-bottom: 20px;
  .item-title {
    font-size: 18px;
    font-weight: 600;
  }
  .item-summary {

  }
}

.item-quantity {
  width: 80px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: flex-start;
  font-size: 18px;
  font-weight: 600;
}

.order-status {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.open-button {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  text-align: center;
}

.order-detail {
  position: absolute;
  width: 100%;
  min-height: 400px;
  background-color: white;
}
.no-orders {
  width: 100%;
  text-align: center;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}
.tac {
  text-align: center;
}
.fww {
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
.aifs {
  -ms-align-items: flex-start;
  align-items: flex-start;
}
.w100p {
  width: 100%;
}
.curp {
  cursor: pointer;

  & > * {
    cursor: pointer;
  }
}
</style>
