<template>
  <div class="wrap page1 f1 df">
    <div v-if="this.$store.getters.currentActionData" class="wrap-inner f1 df fdc">
      <div class="campaign-row title-row">
        <p>{{ this.$store.getters.currentActionData.details.title }}</p>
      </div>
      <div class="campaign-row df fdr">
        <img class="action-image" v-bind:src="this.$store.getters.currentActionData.details.image">
        <p class="f1 df fdc jcc aic title-and-org">
          <span>{{ this.$store.getters.currentActionData.details.title }}</span>
          <span>{{ this.$store.getters.currentActionData.details.organization }}</span>
        </p>
      </div>
      <hr>
      <div class="campaign-row text-row" v-on:click="test">
        <p>{{ this.$store.getters.currentActionData.details.text }}</p>
      </div>
      <hr>
      <div class="campaign-row text-row">
        <p v-html="this.$store.getters.currentActionData.details.instructions"></p>
      </div>
      <div class="campaign-row button-row df jcc aic">
        <button class="button-action button-complete-action" v-if="(this.$store.getters.myActiveActions || {})[this.$route.params.actionid]" v-on:click="completeAction()">Complete Action</button>
        <button class="button-action" v-else v-on:click="acceptAction()">Accept Action</button>
      </div>
      <!-- <div class="campaign-row button-row df jcc aic">
        <button class="button-action" v-on:click="acceptAction()">Complete Action</button>
      </div> -->
      <div class="campaign-row campaign-card-row">
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
    test () {
      var actionid = this.$route.params.actionid
      console.log('test', this.$store.getters.myActiveActions, actionid)
    },
    acceptAction () {
      console.log('accept action')
      this.$store.dispatch('acceptAction', {
        userid: this.$store.getters.uid,
        actionid: this.$store.getters.currentActionData.id,
        campaignid: this.$store.getters.currentActionData.details.organizationid
      }).then(() => {
        console.log('After getting action data')
      })
    },
    completeAction () {
      console.log('complete action')
      this.$store.dispatch('completeAction', {
        userid: this.$store.getters.uid,
        actionid: this.$store.getters.currentActionData.id,
        campaignid: this.$store.getters.currentActionData.details.organizationid
      }).then(() => {
        console.log('After completing action')
      })
    }
    // goToCampaignAction () {
    //   router.push('/campaign/' + this.$store.getters.currentCampaignData.id + '/actions')
    // }
  },
  computed: {
    friendsWorkingOnCampaign: function() {
      console.log('friends for action', this.$store.getters.currentActionData.details.activeUsers || {})
      console.log('myFriends', this.$store.getters.myFriends || {})
      var campaignUsers = this.$store.getters.currentActionData.details.activeUsers || {}
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
        friendsString = friendsString + 'working on this action'
        return friendsString
      } else {
        return ''
      }
    }
  },
  created () {
    var actionid = this.$route.params.actionid
    console.log('** Action Component Loaded', actionid)
    this.$store.dispatch('getActionData', {
      id: actionid
    }).then(() => {
      console.log('After getting action data')
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
.action-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: center;
}
.button-row {
  padding: 50px;
}
hr {
  width: 100%;
}
.title-and-org {
  & > span:first-child {
    font-weight: 600;
  }

  & > span:last-child {
    margin-top: 12px;
  }
}
.text-row {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
