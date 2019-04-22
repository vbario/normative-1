<template>
  <div class="wrap page1 f1 df">
    <div class="wrap-inner f1 df fdc">
      Action
      <!-- <div class="campaign-row title-row">
        <p>{{ this.$store.getters.currentCampaignData.details.name }}</p>
      </div>
      <div class="campaign-row">
        <img class="top-image" v-bind:src="this.$store.getters.currentCampaignData.details.cardImage">
      </div>
      <div class="campaign-row df fdr org-row">
        <p class="org-image df jcc aic tac">org img</p>
        <p class="">Org Name</p>
      </div>
      <div class="campaign-row">
        <p>{{ this.$store.getters.currentCampaignData.details.text }}</p>
      </div>
      <hr>
      <div class="campaign-row button-row df jcc aic">
        <button class="button-action" v-on:click="goToCampaignAction()">Get Started With An Action</button>
      </div>
      <div class="campaign-row campaign-card-row"> -->
        <!-- <p>No friends are working on this campaign</p>
      </div>
      <div class="campaign-row add-friends-row df">
        <p><span>+</span> Add Friends</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'DashboardCampaign',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: [],
  components: {
  },
  methods: {
    // goToCampaignAction () {
    //   router.push('/campaign/' + this.$store.getters.currentCampaignData.id + '/actions')
    // }
  },
  computed: {

  },
  created () {
    var params = this.$route.params
    console.log('** Action Component Loaded', params)
    // this.$store.dispatch('getCampaignData', {
    //   id: campaignID
    // }).then(() => {
    //   console.log('After getting campaign data')
    // })
  }
}
</script>

<style scoped lang="scss">
.page1 {
  padding-top: 0;
}
.wrap-inner {
  /*background-image: url('../../static/images/news-bg.svg');*/
  background-position: center;
  -webkit-background-size: contain;
  background-size: contain;
  background-repeat: no-repeat;
  /*justify-content: flex-end;*/
}
.wrap {
  width: 100%;
}
.org-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #abc;
  margin-right: 10px;
}
.org-row {
  -ms-align-items: center;
  align-items: center;
}
.campaign-row {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}
.top-image {
  height: 37vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.button-row {
  padding: 50px;
}
hr {
  width: 100%;
}
</style>
