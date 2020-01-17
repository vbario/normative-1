<template>
  <div class="df fdc order-card posrel f1">
    <!-- <p class="order-id">{{ order.orderid }}</p> -->
    <span v-for="(item, itemid) in order.order.cart.items" class="item df fdr asc f1">
      <span class="df fdc">
        <span class="df">
          <span class="item-quantity">
            {{item.quantity}}
          </span>
          <span class="df fdc item-type">
            <h3>
              <span class="capitalize">{{item.type}}</span>
            </h3>
            <p>
              <span class="capitalize coffee-size">{{item.size}}</span>
            </p>
          </span>
        </span>
        <span class="df fdr">
          <span class="df fdc option-column jcc">
            <span v-for="(cream, creamid) in item.details.cream" class="options">
              <span class="extra-quantity">{{cream.quantity}}</span> {{cream.type}}
            </span>
          </span>
          <span class="df fdc option-column jcc">
            <span v-for="(sugar, sugarid) in item.details.sugar" class="options">
              <span class="extra-quantity">{{sugar.quantity}}</span> {{sugar.type}}
            </span>
          </span>

          <span class="df fdc option-column jcc">
            <span v-for="(extra, extraid) in item.details.extras" class="options" v-if="extra.quantity && (extra.type.toLowerCase() !== 'extra')">
              <span class="extra-quantity">+</span> {{ extra.type }}
            </span>
          </span>
        </span>
      </span>

      <span v-if="price" class="df jcc aic">{{formatPrice(item.quantity * item.sizes.filter(v => v.name.toLowerCase() == item.size.toLowerCase())[0].price)}}</span>
    </span>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'OrderCard1',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: ['id', 'order', 'price'],
  components: {

  },
  methods: {
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
  },
  computed: {
  },
  created () {
    console.log('CARD', this.order.order.cart, this.order.order.status)
  }
}
</script>

<style scoped lang="scss">
h3 {
  font-size: 21px;
}
.coffee-size {
  font-size: 16px;
  font-weight: 500;
}
.capitalize {
  text-transform: capitalize;
}
.order-card {
  width: 100%;
}
.order-id {
  font-size: 13px;
  position: absolute;
  right: 0;
  top: 0;
}
.coffee-size, .options {
  font-size: 18px;
}
._s01 {
  margin-bottom: 5px;
}

$itemQuantity: 80px;

.item-quantity {
  font-size: 45px;
  font-weight: 500;
  width: $itemQuantity;
}
.options {
  margin-left: $itemQuantity;
}
.item {
  margin-bottom: 20px;
  /*border-bottom: 1px solid #cdcdcd;*/
  padding-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.item-type {
  width: 120px;
}
.option-column {
  width: 100px;
  margin-right: 15px;
}
.extra-quantity {
  font-size: 24px;
  font-weight: 500;
  margin-right: 15px;
}
.options {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
}
</style>
