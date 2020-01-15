<template>
  <div class="wrap page1 f1 df fdc aic">

    <div class="wrap-inner f1 df fdc aic" v-if="openOrder.open && openItem.type">
      <h1 class="type product-type-title">{{ openItem.type.toUpperCase() }}</h1>
      <span class="df row-wrapper">
        <span v-for="(size, id) in openItem.sizes" v-on:click="setSize(size.name)" class="menu-button size-setting" v-bind:class="{'menu-button-selected': openItem.size == size.name}"><p>{{ size.name }}</p></span>
      </span>
      <h2 class="product-type-extras">
        Extras
      </h2>
      <span class="df column-wrapper fdc aifs">

        <span v-for="(item, id) in openItem.details.cream" class="df row-wrapper posrel">
          <input type="number" v-model="item.quantity" class="menu-button half-button menu-button-color-4">
          <select class="menu-button half-button dropdown menu-button-color-4" v-model="item.type">
            <option value="Cream">Cream</option>
            <option value="Milk">Milk</option>
            <option value="Coconut Milk">Coconut Milk</option>
          </select>
          <span class="add" v-on:click="addCream()" v-if="id == (openItem.details.cream.length - 1)">
            +
          </span>
        </span>

        <span v-for="(item, id) in openItem.details.sugar" class="df row-wrapper posrel">
          <input type="number" v-model="item.quantity" class="menu-button half-button menu-button-color-3">
          <select class="menu-button menu-button-color-3 half-button dropdown" v-model="item.type">
            <option value="Sugar">Sugar</option>
            <option value="Stevia">Honey</option>
            <option value="Stevia">Stevia</option>
          </select>
          <span class="add" v-if="id == (openItem.details.sugar.length - 1)" v-on:click="addSugar()">
            +
          </span>
        </span>

        <span v-for="(item, id) in openItem.details.extras" class="df row-wrapper posrel">
          <span v-model="item.status" class="menu-button quarter-button menu-button-color-2"></span>
          <input class="menu-button menu-button-color-2 half-button dropdown f1" v-model="item.value"/>
          <span class="add" v-on:click="addExtra()" v-if="id == (openItem.details.extras.length - 1)">
            +
          </span>
        </span>
      </span>
      <span class="menu-button menu-button-color-5" v-on:click="addItem()">
        <p>
          Add
        </p>
      </span>
      <span class="menu-button menu-button-color-5" v-on:click="cancelItem()">
        <p>
          Cancel
        </p>
      </span>
    </div>

    <div v-else-if="openOrder.open" class="wrap-inner f1 df fdc aic">
      <div class="menu-button" v-on:click="openItemMenu('new', 'coffee')">
        <p>Coffee</p>
      </div>
      <div class="menu-button" v-on:click="openItemMenu('new', 'espresso')">
        <p>Espresso</p>
      </div>
      <div class="menu-button menu-button-color-4" v-on:click="openItemMenu('new', 'latte')">
        <p>Latte</p>
      </div>
      <div class="menu-button menu-button-color-4" v-on:click="openItemMenu('new', 'capuccino')">
        <p>Capuccino</p>
      </div>
      <div class="menu-button menu-button-color-3" v-on:click="openItemMenu('new', 'cookie')">
        <p>Cookie</p>
      </div>
      <div class="menu-button menu-button-color-2 _s2" v-on:click="openItemMenu('new', 'special')">
        <p>Special</p>
      </div>
      <div class="menu-button menu-button-color-1" v-on:click="backToHome()">
        <p>Back</p>
      </div>

      <!-- <div class="menu-preset">
        <span>
          <img src="" alt="">
        </span>
        <span>
          <p class="menu-preset-title">Name</p>
          <p class="menu-preset-description">Description</p>
        </span>
      </div> -->

       <!--  <select class="menu-button half-button dropdown">
          <option value="">Cream</option>
          <option value="">Cream</option>
          <option value="">Cream</option>
          <option value="">Cream</option>
          <option value="">Cream</option>
        </select> -->
    </div>

    <div v-else class="wrap-inner f1 df fdc aic">
      <div class="menu-button" v-on:click="openNewOrder()">
        <p>New Order</p>
      </div>
      <h3 class="_s1">Current Orders <a>(see past orders)</a></h3>
      <div class="menu-preset _s1" v-for="(order, id) in $store.getters.activeOrders">
        <span>
          <img src="" alt="">
        </span>
        <span>
          <p class="menu-preset-title">{{ order.order.cart.items[0].quantity }} {{ order.order.cart.items[0].type }}</p>
          <p class="menu-preset-description">{{ order.order.cart.items[0].size }}</p>
        </span>
        <span v-if="order.order.status == 'started'">
          <p>Started</p>
        </span>
        <span v-else-if="order.order.status == 'served'" class="menu-button open-button menu-button-color-5" v-on:click="openAnOrder(order)">
          <p>Open {{order.order.servedBox || '0'}}</p>
        </span>
        <span v-else-if="order.order.status == 'active'" class="order-status">
          <p>Placed</p>
        </span>
        <span v-else-if="order.order.status == 'open'" class="menu-button open-button menu-button-color-5" v-on:click="completeOrder(order)">
          <p> Done - Close {{order.order.servedBox || '0'}}</p>
        </span>
      </div>
      <h3 class="_s1">Favorites</h3>
      <div class="menu-button" v-on:click="openFromPreset()">
        <p>Morning Coffee</p>
      </div>
    </div>

    <span class="up-tab" v-on:click="flipCart()">
      {{ showCart ? 'down' : 'up' }}
    </span>
    <div class="cart posrel df fdc" v-if="showCart">
      <h3 class="_s1">Complete Your Order</h3>
      <p v-if="openOrder.items.length == 0" class="_s1">No items selected</p>
      <span v-for="(item, id) in openOrder.items" class="cart-item df">
        <p class="item-quantity">
          {{ item.quantity }}
        </p>
        <span class="df fdc">
          <p class="item-title">{{ item.type }}</p>
          <p class="item-summary">{{ fullDescription(item) }}</p>
        </span>
      </span>
      <span v-if="openOrder.items.length == 0" class="complete-order menu-button menu-button-color-5" v-on:click="flipCart()">
        <p>
          See The Menu
        </p>
      </span>
      <span v-else class="complete-order menu-button menu-button-color-5" v-on:click="submitOrder()">
        <p>
          Complete Order
        </p>
      </span>
    </div>

  </div>
</template>

<script>
import CampaignCard from './CampaignCard'


var startOrder = function() {
  var startingOrder = {
    open: false,
    items: []
  }
  return {...startingOrder}
}

var oneSugar = function () {
  return {
    quantity: 0,
    type: 'Sugar'
  }
}

var oneExtra = function () {
  return {
    status: false,
    value: ''
  }
}  

var oneCream = function () {
  return {
    quantity: 0,
    type: 'Milk'
  }
}

var startItem = function() {
  var startingItem = {
    type: '',
    quantity: 1,
    sizes: [
      {
        name: 'Small'
      }, 
      {
        name: 'Large'
      }
    ],
    size: 'Small',
    details: {
      cream: [
        oneCream()
      ],
      sugar: [
        oneSugar()
      ],
      extras: [
        oneExtra()
      ]
    }
  }

  return {...startingItem}
}

export default {
  name: 'DashboardMain',
  data () {
    return {
      mode: 'view', // or edit
      showCart: false,
      searchString: '',
      openOrder: startOrder(),
      openItem: startItem(),
      activeOrders: []
    }
  },
  props: [],
  components: {
    CampaignCard
  },
  methods: {
    backToHome () {
      this.openOrder.open = false
    },
    submitOrder () {
      var _date = new Date()
      _date = _date.getTime()
      this.$store.dispatch('submitOrder', {
        userid: this.$store.getters.uid,
        cart: this.openOrder,
        location: '0001',
        status: 'active',
        datePlaced: _date
      }).then((data) => {
        if (data.status == 'ok') {
          this.openOrder = startOrder()
          this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    openAnOrder (order) {
      console.log('complete order', order)
      this.$store.dispatch('openOrder', {
        userid: this.$store.getters.uid,
        orderid: order.orderid,
        date: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          console.log('order opened')
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    completeOrder (order) {
      console.log('complete order', order)
      this.$store.dispatch('completeOrder', {
        userid: this.$store.getters.uid,
        orderid: order.orderid,
        date: new Date()
      }).then((data) => {
        if (data.status == 'ok') {
          console.log('order completed')
          // this.openOrder = startOrder()
          // this.showCart = false
        } else { 
          // show order error
        }
      })
    },
    fullDescription (item) {
      return 'detail'
    },
    flipCart () {
      this.showCart = !this.showCart
    },
    addItem () {
      var openOrder = {...this.openOrder}
      openOrder.items.push({...this.openItem})
      this.openItem = startItem()
    },
    cancelItem () {
      this.openItem = startItem()
    },
    setSize (size) {
      var openItem = {...this.openItem}
      openItem.size = size
      this.openItem = openItem
    },
    addCream () {
      var openItem = this.openItem
      openItem.details.cream.push({...oneCream()})
      this.openItem = openItem
    },
    addSugar () {
      var openItem = this.openItem
      openItem.details.sugar.push({...oneSugar()})
      this.openItem = openItem
    },
    addExtra () {
      var openItem = this.openItem
      openItem.details.extras.push({...oneExtra()})
      this.openItem = openItem
    },
    openItemMenu (status, type) { // 'new', 'existing'
      this.openItem = {...startItem(), type: type}
    },
    openNewOrder (id) {
      if (id) {
        
      } else {
        this.openOrder = {...startOrder(), open: true}
      }
    },
    showCampaigns () {
      console.log('campaigns', this.$store.getters.campaignSearchList)
    },
    searchCampaigns () {
      console.log('Searching for campaign with string:', this.searchString)
      this.$store.dispatch('searchCampaigns', {
        query: this.searchString
      }).then(() => {
        console.log('After searching campaigns', this.$store.getters.campaignSearchList)
      })
    }
  },
  computed: {

  },
  created () {
    this.searchCampaigns()
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
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

.product-type-title {
  margin-bottom: 30px;
}

.product-type-extras {
  margin-bottom: 20px;
  color: #2c3e50;
}

.wrap-inner {
  padding: 50px;
/*  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;*/
  width: 100%;
  max-width: 500px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}
.openItem {

}
.row-wrapper {
  width: 100%;

  .menu-button {
    margin-right: 10px;
    margin-left: 10px;
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
}
.column-wrapper {
  width: 100%;

  & > .menu-button {
    margin-top: 10px;
    margin-bottom: 10px;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
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
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  max-width: 500px;
  height: 90%;
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
  width: 120px;
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
</style>

