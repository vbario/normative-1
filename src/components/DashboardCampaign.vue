<template>
  <div class="wrap page1 f1 df">
    <div v-if="this.$store.getters.currentCampaignData" class="wrap-inner f1 df fdc">
      <div class="campaign-row title-row">
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
      <div class="campaign-row campaign-card-row friends-working">
        <p>{{ friendsWorkingOnCampaign }}</p>
      </div>
      <div class="campaign-row add-friends-row df">
        <p><span>+</span> Add Friends</p>
      </div>
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
    goToCampaignAction () {
      router.push('/campaign/' + this.$store.getters.currentCampaignData.id + '/actions')
    }
  },
  computed: {
    friendsWorkingOnCampaign: function() {
      console.log('friends for campaign', this.$store.getters.currentCampaignData.details.activeUsers || {})
      console.log('myFriends', this.$store.getters.myFriends || {})
      var campaignUsers = this.$store.getters.currentCampaignData.details.activeUsers || {}
      var myFriends = this.$store.getters.myFriends || {}
      var friendsCount = 0

      for (var user in myFriends) {
        if (campaignUsers[user]) {
          friendsCount = friendsCount + 1
        }
      }

      if (friendsCount > 0) {
        var friendsString = friendsCount + ' '
        if (friendsCount == 1) {
          var friendsString = friendsString + 'friend is '
        } else {
          var friendsString = friendsString + 'friends are '
        }
        friendsString = friendsString + 'working on this campaign'
        return friendsString
      } else {
        return ''
      }
    }
  },
  created () {
    var campaignID = this.$route.params.id
    console.log('** Campaign Component Loaded', campaignID)
    this.$store.dispatch('getCampaignData', {
      id: campaignID
    }).then(() => {
      console.log('After getting campaign data')
    })
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
.friends-working {
  font-weight: 600;
}
hr {
  width: 100%;
}
</style>
