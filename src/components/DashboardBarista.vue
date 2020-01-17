<template>
  <div class="wrap page1 f1 df fdc aic">

    <div class="wrap-inner f1 df fdc aic">
      <!-- <h1 class="type product-type-title">Orders</h1> -->
      <span class="df row-wrapper fdc">
        <p v-if="$store.getters.activeOrdersBarista.length == 0" class="no-orders tac">No active orders</p>


        <span v-for="(order, id) in $store.getters.activeOrdersBarista" v-if="(order.order.status == 'active') || (order.order.status == 'started')" class="one-order df fdr jcsb">
          <span class="df fdc order-wrapper jcc">
            <OrderCard1 v-bind:id="id" v-bind:order="order"/>
          </span>
          <Countdown class="time df aic jcc f1" v-bind:date="order.order.datePlaced"/>
          <span class="df fdr aic" v-if="order.order.status == 'active'">
            <span class="menu-button staff-button" v-on:click="startOrder(id, staff.staff.name, staff.staff.id)" v-for="(staff, staffid) in $store.getters.allStaff">
              <p>
                {{ initials(staff.staff.name) }}
              </p>
            </span>
          </span>
          <span class="df fdr aic" v-if="order.order.status == 'started'">
            <span class="menu-button staff-button started-button">
              <p>
                {{ initials(order.order.barista_name || '') }}
              </p>
            </span>
          </span>
          <!-- <p>
            {{ order.order.barista }}
          </p> -->
        </span>



      </span>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <span v-if="openOrder || (openOrder === 0)" class="order-detail df fdc jcc aic">
        <span v-for="(item, itemid) in $store.getters.activeOrdersBarista[openOrder].order.cart.items" class="df jcc aic">
          {{ item.quantity }} x {{ item.type }}
        </span>
        <span v-if="$store.getters.activeOrdersBarista[openOrder].order.status == 'active'" class="menu-button quarter-button" v-on:click="startOrder()">
          <p>
            Start
          </p>
        </span>
        <span v-else-if="$store.getters.activeOrdersBarista[openOrder].order.status == 'started'" class="menu-button quarter-button" v-on:click="completeOrder()">
          <p>
            Complete Order
          </p>
        </span>
        <span class="menu-button quarter-button" v-on:click="backFromOrder()">
          <p>
            Back
          </p>
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
  name: 'DashboardBarista',
  data () {
    return {
      baristas: [
        {}
      ],
      activeOrders: [],
      openOrder: false
    }
  },
  props: [],
  components: {
    Countdown,
    CampaignCard,
    OrderCard1
  },
  methods: {
    initials (name) {
      var initials = name.match(/\b\w/g) || []
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      return initials
    },
    completeOrder () {

    },
    startOrder (order, barista_name, barista_id) {
      console.log('order', this.$store.getters.activeOrdersBarista[order].order.userid)
      this.$store.dispatch('baristaStartOrder', {
        userid: this.$store.getters.activeOrdersBarista[order].order.userid,
        orderid: this.$store.getters.activeOrdersBarista[order].orderid,
        dateStarted: new Date(),
        barista_name: barista_name,
        barista_id: barista_id
      }).then((data) => {
        if (data.status == 'ok') {
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    backFromOrder () {
      this.openOrder = false
    },
    backToHome () {
      this.openOrder.open = false
    },
    submitOrder () {
      this.$store.dispatch('submitOrder', {
        userid: this.$store.getters.uid,
        cart: this.openOrder,
        status: 'active',
        date: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          // this.openOrder = startOrder()
          this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    seeOrder (orderid) {
      this.openOrder = orderid
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
  /*min-height: 100vh;*/
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

.wrap-inner {
  width: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  max-width: $maxWidth1;
  padding-left: $space1;
  padding-right: $space1;
}

.staff-button {
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }
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
.order-wrapper {
  width: 100%;
  margin-right: 20px;
}
.started-button {
  background-color: #ddd;
}

.time {
  font-size: 28px;
  margin-right: 20px;
}

.row-wrapper {
  /*overflow-y: auto;*/
  /*height: calc(100vh - #{$headerHeight});*/
}
</style>

