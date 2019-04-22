<template>
  <div class="campaign-card-wrapper">
    <div class="box campaign-card df fdc jcsb">
      <img v-bind:src="cardImage" alt="" class="campaign-card-image df jcc aic" v-on:click="goToCampaignPage()">
      <div class="campaign-card-row">
        <p class="org-image df jcc aic tac">org img</p>
        <p class="campaign-title f1 df fdr">{{ actualName }}</p>
        <!-- <p>share</p> -->
      </div>
      <div class="campaign-card-row">
        <p>{{ actualText }}</p>
      </div>
      <div class="campaign-card-row">
        <!-- <p>No friends are working on this campaign</p> -->
      </div>
      <div class="campaign-card-row add-friends-row">
        <p><span>+</span> Add Friends</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'CampaignCard',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: ['name', 'cardImage', 'text' ,'id'],
  components: {

  },
  methods: {
    goToCampaignPage () {
      console.log('go to campaign', this.id)
      router.push('/campaign/' + this.id)
    }
  },
  computed: {
    actualName: function () {
      var maxLength = 15
      var nameString = this.name.substring(0, maxLength)
      if (this.name.length > maxLength) {
        nameString = nameString + '...'
      }
      return nameString
    },
    actualText: function () {
      var maxLength = 150
      var textString = this.text.substring(0, maxLength)
      if (this.text.length > maxLength) {
        textString = textString + '...'
      }
      return textString
    }
  },
  created () {
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
.campaign-card-wrapper {
  padding: 10px 0;
  width: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

@media (min-width: 720px) {
  .campaign-card-wrapper {
    width: 50%;
    padding: 10px 20px;
    /*&:nth-child(n) {
      padding-left: 0;
    }
    &:nth-child(2n) {
      padding-right: 0;
    }*/
  }
}

@media (min-width: 1100px) {
  .campaign-card-wrapper {
    width: calc(100%/3);
    padding: 10px 20px;

    /*&:nth-child(n) {
      padding-left: calc(2 * 20px / 3);
    }
    &:nth-child(2n) {
      padding-right: calc(2 * 20px / 3);
    }
    &:nth-child(3n + 1) {
      padding-left: 0;
    }
    &:nth-child(3n) {
      padding-right: 0;
    }*/
  }
}

.campaign-title {
  font-size: 20px;
  font-weight: 500;
  color: #343a40;
  line-height: 1em;
  white-space: nowrap;
  text-align: center;
  justify-content: flex-start;
  -ms-align-items: center;
  align-items: center;
}

.org-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #abc;
  margin-right: 10px;
}

.campaign-card {
  flex: 1;
  border-radius: 12px;
  max-height: 500px;
}

.campaign-card-image {
  height: 174px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background-color: #ccc;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.campaign-card-row {
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
  padding: 10px 20px;
}













</style>
