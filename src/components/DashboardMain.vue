<template>
  <div class="wrap page1 f1 df fdc aic">

    <!-- MENU -->
    <div v-if="openOrder.open" class="wrap-inner df fdr fww aifs">
      <!-- <div class="w100p _s1 curp" v-on:click="backToHome()">
        <p>< back</p>
      </div> -->
      <div v-for="(type, typeid) in this.menu ? this.menu.items : []" v-bind:class="'menu-button item-button menu-button-color-' + type.name.toLowerCase()" v-on:click="openItemMenu('new', type.name.toLowerCase())">
        <p>{{ type.name }}</p>
      </div>
    </div>



    <!-- OPEN ITEM -->
    <div class="wrap-inner f1 df fdc aic" v-if="menu && openOrder.open && openItem">
      <h1 class="type product-type-title">{{ openItem.type.toUpperCase() }}</h1>

      <span class="df column-wrapper fdc aifs">
        <span class='df row-wrapper posrel  '>
          <input type="number" class="item-quantity-on-order menu-button half-button" v-model="openItem.quantity">
          <!-- {{openItem}} -->
          <input disabled type="text" value="Quantity" class="menu-button half-button"/>
        </span>
      </span>

      <!-- SIZE -->
      <span class="df row-wrapper">
        <span v-for="(size, id) in openItem.sizes" v-on:click="setSize(size.name)" class="menu-button size-setting df fdc" v-bind:class="{'menu-button-selected': openItem.size == size.name}">
          <p>{{ size.name }}</p>
          <p class="size-price">{{ formatPrice(size.price) }}</p>
        </span>
      </span>

      <!-- OPTIONS -  IF NOT COOKIE -->
      <h2 class="product-type-extras" v-if="openItem.type.toLowerCase() !== 'cookie'">
        Extras
      </h2>
      <span class="df column-wrapper fdc aifs" v-if="openItem.type.toLowerCase() !== 'cookie'">

        <!-- CREAMS -->
        <span v-for="(item, id) in openItem.details.cream" class="df row-wrapper posrel">
          <input type="number" v-model="item.quantity" class="menu-button half-button menu-button-color-4">
          <select class="menu-button half-button dropdown menu-button-color-4" v-model="item.type">

            <option v-for="(aSugar, aSugarId) in menu.items.filter(item => item.name.toLowerCase() == openItem.type)[0].cream"
               v-bind:value="aSugar.name">{{aSugar.name}} {{aSugar.price ? '(' + formatPrice(aSugar.price) + ')' : ''}}</option>
          </select>
          <span class="add" v-on:click="addCream()" v-if="id == (openItem.details.cream.length - 1)">
            +
          </span>
        </span>

        <!-- SUGARS -->
        <span v-for="(item, id) in openItem.details.sugar" class="df row-wrapper posrel">
          <input type="number" v-model="item.quantity" class="menu-button half-button menu-button-color-3">
          <select class="menu-button menu-button-color-3 half-button dropdown" v-model="item.type">
            <option v-for="(aSugar, aSugarId) in menu.items.filter(item => item.name.toLowerCase() == openItem.type)[0].sugar"
               v-bind:value="aSugar.name">{{aSugar.name}} {{aSugar.price ? '(' + formatPrice(aSugar.price) + ')' : ''}}</option>
          </select>
          <span class="add" v-if="id == (openItem.details.sugar.length - 1)" v-on:click="addSugar()">
            +
          </span>
        </span>

        <!-- EXTRAS -->
        <span v-for="(item, id) in openItem.details.extras" class="df row-wrapper posrel">

          <input type="checkbox" v-model="item.quantity" class="menu-button half-button menu-button-color-3">

          <select class="menu-button menu-button-color-3 half-button dropdown" v-model="item.type" placeholder="Select Extra">
            <option v-for="(aSugar, aSugarId) in menu.items.filter(item => item.name.toLowerCase() == openItem.type)[0].extras"
               v-bind:value="aSugar.name" v-bind:default="aSugarId == 0">{{aSugar.name}} {{aSugar.price ? '(' + formatPrice(aSugar.price) + ')' : ''}}</option>
          </select>
          <span class="add" v-if="id == (openItem.details.extras.length - 1)" v-on:click="addExtra()">
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

    <!-- CURRENT ORDERS -->
    <div v-if="!openOrder.open && !openItem" class="wrap-inner f1 df fdc aic">
      <h3 class="_s01 w100p df" v-if="$store.getters.activeOrders.length > 0">Current Order{{$store.getters.activeOrders.length > 1 ? 's' : ''}}</h3>
      <div class="menu-preset _s01" v-for="(order, id) in $store.getters.activeOrders" v-if="$store.getters.activeOrders.length > 0">
        <span class="order-actions df aic jcc">


          <span v-if="order.order.status == 'started'" class="order-button open-button menu-button-color-5">
            <p>Started</p>
          </span>
          <span v-else-if="order.order.status == 'served'" class="order-button open-button menu-button-color-2" v-on:click="openAnOrder(order)">
            <p>Open {{order.order.servedBox || '0'}}</p>
          </span>
          <span v-else-if="order.order.status == 'active'" class="order-button open-button menu-button-color-3">
            <p>Placed</p>
          </span>
          <span v-else-if="order.order.status == 'open'" class="order-button open-button menu-button-color-4" v-on:click="completeOrder(order)">
            <p> Done - Close {{order.order.servedBox || '0'}}</p>
          </span>


        </span>
        <span class="current-order-detail">
          <p class="menu-preset-title df fdc">
            <span v-for="(oneItem, oneItemId) in order.order.cart.items">
              {{ oneItem.quantity }} {{ oneItem.size }} {{ oneItem.type }}
            </span>
            <span class="see-details">Order details</span>
          </p>
        </span>



      </div>
      <div class="menu-button new-order-button _s1" v-on:click="openNewOrder()">
        <p>New Order</p>
      </div>
      <h3 class="_s01 w100p df">Favorites
        <div class="df jcfe w100p curp">
          <a v-on:click="showThePastOrders()">
            see past orders
          </a>
        </div>
      </h3>
      <div class="df fdc w100p favorites-wrapper">
        <div class="df w100p posrel" v-for="(favorite, favoriteid) in $store.getters.myFavorites">
          <div class="menu-button favorite-button" v-on:click="orderAgain(favorite)">
            <p>{{favorite.preset_name}}</p>
          </div>
          <span class="add" v-on:click="editFavorite(favorite, favoriteid)">
            edit
          </span>
        </div>
      </div>
    </div>

    <!-- CART TAB -->
    <!-- <span class="up-tab" v-on:click="flipCart()">
      {{ showCart ? 'down' : 'up' }}
    </span> -->

    <!-- PAST ORDERS -->
    <div class="cart posrel df fdc" v-if="showPastOrders">
      <h3 class="_s1">Past Orders</h3>

      <span class="df jcsb">
        <p v-if="!$store.getters.completedOrders.length" class="_s1">No past orders</p>
        <span>
          <span v-for="(item, id) in $store.getters.completedOrders" class="cart-item order-item df fdc">
            <p class="order-id">
              Order #{{item.orderid}}
            </p>
            <p class="order-id">
              Placed: {{formatDate(item.order.datePlaced)}}
            </p>
            <p class="order-id _s1">
              Picked up: {{formatDate(item.order.dateCompleted)}}
            </p>
            <OrderCard1 v-bind:id="id" v-bind:order="item" v-bind:price="true" class="_s1"/>
            <p class="cart-total _s1 df jcfe">
              Subtotal {{ formatPrice(orderTotal(id)) }}
            </p>
            <p class="cart-total _s1 df jcfe">
              Tax (13%) {{ formatPrice(orderTotal(id) * .13) }}
            </p>
            <h3 class="cart-total _s1 df jcfe">
              {{ formatPrice(orderTotal(id) * 1.13) }}
            </h3>
            <p class="order-id _s1 df jcfe" v-if="item.order.dateRefunded">
              Refunded: {{formatDate(item.order.dateRefunded)}}
            </p>
            <span class="order-actions">
              <span class="menu-button _s1" v-on:click="orderAgain(item)">
                <p>Order Again</p>
              </span>
              <input type="text" class="favorite-input" v-if="showSaveAsFavorite == item" v-model="showSaveAsFavoriteText">
              <!-- <span class="menu-button _s1" v-on:click="saveAsFavorite(item)"> -->
              <span class="menu-button _s1" v-on:click="startSaveAsFavorite(item)">
                <p>Save As Favorite</p>
              </span>
              <span class="df jcc aic star-ratings df fdc">
                <h3 class="_s01"> Rate this order</h3>
                <p>*****</p>
              </span>
              <p class="other-links df jcfe" v-if="withinLastHour(item) && !item.order.dateRefunded" v-on:click="requestRefund(item)">
                request refund
              </p>
            </span>
          </span> 
        </span>
      </span>

      <span v-if="(openOrder.items.length == 0) || showPastOrders" class="complete-order menu-button menu-button-color-5" v-on:click="hidePastOrders()">
        <p>
          Back
        </p>
      </span>
    </div>

    <!-- CART -->
    <div class="cart posrel df fdc" v-if="openOrder.open && !openItem">
      <h3 class="_s1">Complete Your Order</h3>
      <p v-if="openOrder.items.length == 0" class="_s1">No items selected</p>
      <span v-for="(item, id) in openOrder.items" class="cart-item df">
        <p class="item-quantity df jcc aic">
          {{ item.quantity }}
        </p>
        <span class="df fdc f1">
          <p class="item-title">{{ item.type }}</p>
          <p class="item-summary">{{ item.size }}</p>
          <p class="item-summary">{{ fullDescription(item) }}</p>
        </span>
        <p class="item-price df jcc aic">
          {{ formatPrice(item.quantity * item.sizes.filter(v => v.name.toLowerCase() == item.size.toLowerCase())[0].price) }}
        </p>
      </span>
      <p class="cart-total _s1 df jcfe">
        Subtotal {{ formatPrice(openOrderTotal()) }}
      </p>
      <p class="cart-total _s1 df jcfe">
        Tax (13%) {{ formatPrice(openOrderTotal() * .13) }}
      </p>
      <h3 class="cart-total _s1 df jcfe">
        Total {{ formatPrice(openOrderTotal() * 1.13) }}
      </h3>
      <!-- <span v-if="openOrder.items.length == 0" class="complete-order menu-button menu-button-color-5" v-on:click="flipCart()">
        <p>
          See The Menu
        </p>
      </span> -->
      <span v-if="openOrder.items.length > 0" class="complete-order menu-button menu-button-color-5" v-on:click="submitOrder()">
        <p>
          Complete Order
        </p>
      </span>
    </div>



  </div>
</template>

<script>
import OrderCard1 from './OrderCard1'
import CampaignCard from './CampaignCard'

export default {
  name: 'DashboardMain',
  data () {
    return {
      showPastOrders: false,
      menu: null,
      mode: 'view', // or edit
      showCart: false,
      searchString: '',
      openOrder: this.startOrder(),
      openItem: null,
      // openItem: startItem(menu, 'Coffee'),
      activeOrders: [],
      showSaveAsFavorite: false,
      showSaveAsFavoriteText: ''
    }
  },
  props: ['setBackButton'],
  components: {
    CampaignCard,
    OrderCard1
  },
  methods: {
    withinLastHour (order) {
      console.log('withinLastHour', order.order.dateCompleted)
      var _date = new Date(parseInt(order.order.dateCompleted))
      var now = new Date()

      console.log(((now.getTime() - _date.getTime())/3600000) < 1)

      return ((now.getTime() - _date.getTime())/3600000) < 1
    },
    startSaveAsFavorite (order) {
      if (this.showSaveAsFavoriteText) {
        this.saveAsFavorite(order)
        this.showSaveAsFavorite = false
        this.showSaveAsFavoriteText = ''
      } else {
        this.showSaveAsFavorite = order
        this.showSaveAsFavoriteText = ''
      }
    },
    saveAsFavorite (order) {
      console.log('saveAsFavorite', order)
      this.$store.dispatch('saveAsFavorite', {
        order: order,
        userid: this.$store.getters.uid,
        name: this.showSaveAsFavoriteText
      }).then((res) => {
        console.log('test', res)
        this.showPastOrders = false
      })
    },
    orderAgain (order) {
      console.log('orderAgain', order.order.cart.items)
      this.openOrder = {
        ...this.startOrder,
        open: true,
        items: order.order.cart.items
      }
      this.setBackButton(true)
      this.showPastOrders = false
      this.showCart = true
    },
    requestRefund (order) {
      var data = {
        order: order,
        orderid: order.orderid,
        userid: this.$store.getters.uid
      }
      console.log('requestRefund', order)
      this.$store.dispatch('requestRefund', data).then((res) => {
        console.log('after requestRefund', res)
        this.$store.dispatch('getPastOrders', {userid: this.$store.getters.uid}).then((res) => {
          console.log('after getPastOrders', res)
        })
      })
    },
    formatDate (_date) {
      console.log('date', _date, new Date(_date))
      var date = new Date(parseInt(_date));
      var aaaa = date.getUTCFullYear();
      var gg = date.getUTCDate();
      var mm = (date.getUTCMonth() + 1);

      if (gg < 10)
          gg = "0" + gg;

      if (mm < 10)
          mm = "0" + mm;

      var cur_day = aaaa + "-" + mm + "-" + gg;

      var hours = date.getUTCHours()
      var minutes = date.getUTCMinutes()
      var seconds = date.getUTCSeconds();

      if (hours < 10)
          hours = "0" + hours;

      if (minutes < 10)
          minutes = "0" + minutes;

      if (seconds < 10)
          seconds = "0" + seconds;

      return cur_day + " " + hours + ":" + minutes + ":" + seconds;
    },
    hidePastOrders () {
      this.showPastOrders = false
    },
    showThePastOrders () {
      this.showPastOrders = true
      this.$store.dispatch('getPastOrders', {
        userid: this.$store.getters.uid
      })
    },
    orderTotal (orderid) {
      var total = 0
      var thisOrder = this.$store.getters.completedOrders[orderid].order

      console.log('thisOrder', orderid, this.$store.getters.completedOrders)
      console.log('thisOrder2', thisOrder.cart)

      for (var item in thisOrder.cart.items) {
        console.log('item...', thisOrder.cart.items[item])
        var size = thisOrder.cart.items[item].size
        var mySize = thisOrder.cart.items[item].sizes.filter(v => v.name.toLowerCase() == size.toLowerCase())[0]
        total = total + thisOrder.cart.items[item].quantity * mySize.price
      }

      return total
    },
    openOrderTotal () {
      var total = 0
      for (var item in this.openOrder.items) {
        console.log ('cart item', this.openOrder.items[item])
        var size = this.openOrder.items[item].size
        var mySize = this.openOrder.items[item].sizes.filter(v => v.name.toLowerCase() == size.toLowerCase())[0]
        console.log('mySize', this.openOrder.items[item].quantity)
        total = total + this.openOrder.items[item].quantity * mySize.price
      }
      return total
    },
    formatPrice (amount, digits) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits || 2
      })

      if (amount) {
        return formatter.format(amount/100)
      } else {
        return 0
      }
    },
    startItem (type) {

      if (!this.menu) {
        return false
      }

      var startingItem = {
        type: '',
        quantity: 1,
        sizes: this.menu.items.filter(item => item.name.toLowerCase() == type)[0].sizes,
        size: this.menu.items.filter(item => item.name.toLowerCase() == type)[0].sizes[0].name,
        details: {
          cream: [
            this.oneCream()
          ],
          sugar: [
            this.oneSugar()
          ],
          extras: [
            this.oneExtra()
          ]
        }
      }

      return {...startingItem}
    },
    oneSugar () {
      if (this.menu) {
        console.log('this.menu', this.menu)
        return {...this.menu.sugars[0], quantity: 0, type: 'Sugar'}
      } else {
        return ''
      }
    },
    oneExtra () {
      if (this.menu) {
        return {...this.menu.extras[0], quantity: 0, type: 'Extra'}
      } else {
        return ''
      }
    },
    oneCream () {
      if (this.menu) {
        return {...this.menu.creams[0], quantity: 0, type: 'Cream'}
      } else {
        return ''
      }
    },
    backToHome () {
      this.openOrder.open = false
      this.setBackButton(false)
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
          this.setBackButton(true)
          this.openOrder = this.startOrder()
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
      var date = new Date()

      console.log('complete order', order)
      this.$store.dispatch('completeOrder', {
        userid: this.$store.getters.uid,
        orderid: order.orderid,
        date: date.getTime()
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
      console.log('item', item.details.cream[0])
      var returnString = ''
      for (var openItem in item.details.cream) {
        // console.log(',,', item.details.cream)
        if (item.details.cream[openItem].quantity) {
          returnString = returnString + ' ' + item.details.cream[openItem].quantity + ' ' + item.details.cream[openItem].type + ', '
        }
      }
      for (var openItem in item.details.sugar) {
        // console.log(',,', item.details.sugar)
        if (item.details.sugar[openItem].quantity) {
          returnString = returnString + ' ' + item.details.cream[openItem].quantity + ' ' + item.details.sugar[openItem].type + ', '
        }
      }
      for (var openItem in item.details.extras) {
        // console.log(',,', item.details.extras)
        if (item.details.extras[openItem].quantity) {
          returnString = returnString + ' ' + item.details.extras[openItem].type + ', '
        }
      }

      returnString = returnString.substring(0, returnString.length - 2)

      return returnString
    },
    flipCart () {
      this.showCart = !this.showCart
    },
    addItem () {
      var openOrder = {...this.openOrder}
      openOrder.items.push({...this.openItem})
      this.openItem = null
    },
    cancelItem () {
      this.openItem = null
    },
    setSize (size) {
      var openItem = {...this.openItem}
      openItem.size = size
      this.openItem = openItem
    },
    addCream () {
      var openItem = this.openItem
      openItem.details.cream.push({...this.oneCream()})
      this.openItem = openItem
    },
    addSugar () {
      var openItem = this.openItem
      openItem.details.sugar.push({...this.oneSugar()})
      this.openItem = openItem
    },
    addExtra () {
      var openItem = this.openItem
      openItem.details.extras.push({...this.oneExtra()})
      this.openItem = openItem
    },
    openItemMenu (status, type) { // 'new', 'existing'
      this.openItem = {...this.startItem(type), type: type}
    },
    startOrder () {
      var startingOrder = {
        open: false,
        items: []
      }
      return {...startingOrder}
    },
    openNewOrder (id) {
      if (id) {
        
      } else {
        console.log('--->>', this.menu)
        this.openOrder = {...this.startOrder(this.menu, 'Coffee'), open: true}
        this.setBackButton(true)
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
    // ,,,
    // this.searchCampaigns()

    this.waitForMenu = setInterval(() => {
      console.log('*****this...', this.$store.getters.menu)
      if (this.$store.getters.menu.items) {
        this.menu = this.$store.getters.menu
        clearInterval(this.waitForMenu)
      } else {
      }
    }, 200)
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
  /*max-height: calc(100vh - 90px);*/
  /*overflow: hidden;*/
  /* overflow-x: visible; */
  /*overflow-y: auto;*/
}

.product-type-title {
  margin-bottom: 30px;
}

.product-type-extras {
  margin-bottom: 20px;
  color: #2c3e50;
}

.wrap-inner {
  padding: $space1;
  padding-top: 0;
/*  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;*/
  width: 100%;
  /*max-width: 500px;*/
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
  height: 55px;
  width: 55px;
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
  position: unset;
  position: absolute;
  left: calc(100% + 10px);
  top: 14px;

  /*transform: translate(0, -50%);*/
}
.delete {
  /*position: unset;*/
  /*left: unset;*/
  left: calc(100% + 70px);
}
.cart {
  /*overflow-y: auto;*/
  /*position: absolute;*/
  /*bottom: 0;*/
  background-color: white;
  width: 100%;
  /*max-width: 500px;*/
  /*height: 50%;*/
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  padding: $space1;
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
  font-size: 18px;
  font-weight: 600;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
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
  /*width: 120px;*/
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

.menu-button {
  &:hover {
    opacity: 0.9;
  }
}

.item-button {
  /*width: unset;*/
  /*flex: 1;*/
  /*width: calc(50% - 4px);*/
  /*flex: 1;*/
  width: 25%;
  /*margin-bottom: 4px;*/
  /*margin-right: 10px;*/

  & > p {
    font-size: 24px;
  }

  &:last-of-type {
    margin-right: 0;
    /*margin-left: 2px;*/
  }
}
.size-price {
  font-size: 18px;
}
.item-quantity-on-order {
  color: black;
  /*height: 50px;*/
}
.order-actions {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  padding-left: 0;

  & > span {
    cursor: pointer;
    flex: 1;
    width: 100%;

    & > * {
      cursor: pointer;

      & > * {
        cursor: pointer;
      }
    }

    &:hover {
      opacity: 0.9;
    }
  }
}
.current-order-detail {
  cursor: pointer;

  & > * {
    cursor: pointer;

    & > * {
      cursor: pointer;
    }
  }
}
.see-details {
  font-size: 14px;
  color: $color1;
}
.order-id {
  font-size: 20px;
}
.order-item {
  border: 1px solid #ddd;
  padding: 20px;
}
.favorite-button {
  margin-bottom: 15px;
  width: unset;
  flex: 1;
}
.new-order-button {
  /*height: 120px;*/
}
.favorite-input {
  color: black;
  background-color: #aaa
}
.favorites-wrapper {
  /*overflow-y: auto;*/
}
.menu-button-color-cookie {
  /*width: 100%;*/
}
</style>

