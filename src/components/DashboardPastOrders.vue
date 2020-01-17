<template>
  <div class="wrap page1 f1 df fdc aic">
    <div class="wrap-inner f1 df fdc posrel">


      <span class="set-server-number df">
        <span>
          <p class="server-number">
            {{ serverNumber }}
          </p>
        </span>
        <span class="df fdc">
          <p class="server-number-change" v-on:click="changeServerNumberUp()">Up</p>
          <p class="server-number-change" v-on:click="changeServerNumberDown()">Down</p>
        </span>
      </span>

      <!-- <h3>Active Orders</h3> -->
      <span class="active-orders">
        
        <!-- Box With Item -->
        <span v-for="(order, id) in $store.getters.activeOrdersBarista" v-if="(order.order.status == 'served') && itemInBox() && ((order.order.servedBox == serverNumber) || (order.order.servedBox == 0))" class="one-order df fdr jcsb">
          <span class="df fdc">
            <h1 class="df aic">Awaiting pickup</h1>
            <OrderCard1 v-bind:id="id" v-bind:order="order"/>
          </span>
          <Countdown class="time df aic jcc f1" v-bind:date="order.order.dateServed"/>
          <span class="df fdr aic">
            <span class="menu-button serve-button mr_1" v-on:click="noPickupOrder(id)">
              <p>
                No pickup
              </p>
            </span>
            <span class="menu-button serve-button" v-on:click="withdrawOrder(id)">
              <p>
                Withdraw
              </p>
            </span>
          </span>
        </span>
        
        <!-- Box With Item - Customer Open -->
        <span v-for="(order, id) in $store.getters.activeOrdersBarista" v-if="(order.order.status == 'open') && itemInBox() && (order.order.servedBox == serverNumber)" class="one-order df fdr jcsb">
          <span class="df fdc">
            <h1 class="df aic">Please Wait</h1>
            <h3 class="df aic"> Customer Picking up Order</h3>
          </span>
        </span>

        <!-- Open Box -->
        <span v-for="(order, id) in $store.getters.activeOrdersBarista" v-if="(order.order.status == 'started') && !itemInBox()" class="one-order df fdr jcsb">
          <span class="df fdr aic">
            <span class="menu-button staff-button started-button">
              <p>
                {{ initials(order.order.barista_name || '') }}
              </p>
            </span>
          </span>
          <span class="df fdc order-wrapper f1 jcc">
            <OrderCard1 v-bind:id="id" v-bind:order="order"/>
          </span>
          <span class="df fdr aic">
            <span class="menu-button serve-button" v-on:click="serveOrder(id)">
              <p>
                Serve
              </p>
            </span>
          </span>
          <!-- <p>
            {{ order.order.barista }}
          </p> -->
        </span>
      </span>

    </div>
  </div>
</template>

<script>
import CampaignCard from './CampaignCard'
import OrderCard1 from './OrderCard1'
import Countdown from './Countdown'

export default {
  name: 'DashboardServer',
  data () {
    return {
      serverNumber: 0
    }
  },
  props: [],
  components: {
    CampaignCard,
    Countdown,
    OrderCard1
  },
  methods: {
    timeFromDate (date) {
      var startDate = new Date(date)
      var endDate = new Date()
      var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

      return this.timeFormat(seconds)
    },
    timeFormat (seconds) {
      var sec_num = parseInt(seconds, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    },
    itemInBox () {
      var served = this.$store.getters.activeOrdersBarista.filter(a => ((a.order.status == 'served') || (a.order.status == 'open')))
      served = served.filter(a => a.order.servedBox == this.serverNumber)
      if (served[0]) {
        return true
      } else {
        return false
      }
    },
    noPickupOrder (order) {
      console.log('order', this.$store.getters.activeOrdersBarista[order].order.userid)
      this.$store.dispatch('baristaNoPickupOrder', {
        userid: this.$store.getters.activeOrdersBarista[order].order.userid,
        orderid: this.$store.getters.activeOrdersBarista[order].orderid,
        boxNumber: this.serverNumber,
        dateNoPickup: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    withdrawOrder (order) {
      console.log('order', order, this.$store.getters.activeOrdersBarista)
      console.log('order', this.$store.getters.activeOrdersBarista[order].order.userid)
      this.$store.dispatch('baristaWithdrawOrder', {
        userid: this.$store.getters.activeOrdersBarista[order].order.userid,
        orderid: this.$store.getters.activeOrdersBarista[order].orderid,
        boxNumber: this.serverNumber,
        dateWithdrawn: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    serveOrder (order) {
      console.log('order', this.$store.getters.activeOrdersBarista[order].order.userid)
      this.$store.dispatch('baristaServeOrder', {
        userid: this.$store.getters.activeOrdersBarista[order].order.userid,
        orderid: this.$store.getters.activeOrdersBarista[order].orderid,
        boxNumber: this.serverNumber,
        dateServed: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    initials (name) {
      var initials = name.match(/\b\w/g) || []
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      return initials
    },
    changeServerNumberUp () {
      this.serverNumber = this.serverNumber + 1
    },
    changeServerNumberDown () {
      if (this.serverNumber > 0) {
        this.serverNumber = this.serverNumber - 1
      }
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
@import "../styles/settings.scss";
.wrap {
  width: 100%;
  padding: 0;
  min-height: 100vh;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

.wrap-inner {
  width: 100%;
  padding-left: $space1;
  padding-right: $space1;
  max-width: $maxWidth1;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

$margin1: 5px;

.set-server-number {
  /*position: absolute;*/
  right: 30px;
  top: 0;
  height: 150px;
  z-index: 100;

  & > span {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;

    & > p {
      background-color: $color4;
      width: 100%;
      height: 100%;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;
      -ms-align-items: center;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &:first-child {
      width: 150px;
      -ms-align-items: center;
      align-items: center;
      justify-content: center;
      margin: $margin1;
      margin-left: 0;

      & > p {
        margin: $margin1;
        margin-right: 0;
        margin-left: 0;
      }
    }

    &:last-child {
      width: 150px;
      -webkit-flex-direction: column;
      -moz-flex-direction: column;
      -ms-flex-direction: column;
      -o-flex-direction: column;
      flex-direction: column;
      -ms-align-items: center;
      align-items: center;
      justify-content: center;
      margin: $margin1;

      & > p {
        margin: $margin1;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.server-number {
  font-size: 90px;
}

.server-number-change {
  font-size: 30px;
}

.one-order {
  width: 100%;
  padding: 20px 20px;

  &:nth-of-type(odd) {
    background-color: #fefefe;
  }

  &:nth-of-type(even) {
    background-color: #efefef;
  }
}

.mr_1 {
  margin-right: 20px;
}

.time {
  font-size: 28px;
  margin-right: 20px;
}
</style>

