<template>
  <div class="action-card-wrapper">
    <div class="box action-card df fdc jcsb" v-on:click="goToAction()">
      <div class="action-card-row row-with-background">
        <img v-bind:src="image" alt="" class="df jcc aic org-image">
        <p class="action-title f1 df fdr">{{ actualName }}</p>
        <!-- <p>share</p> -->
      </div>
      <div class="action-card-row">
        <p>{{ actualText }}</p>
      </div>
      <div class="action-card-row">
        <p>{{ friendsWorkingOnCampaign }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'ActionCard',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: ['title', 'image', 'id', 'text', 'activeUsers'],
  components: {

  },
  methods: {
    goToAction () {
      router.push('/action/' + this.id)
    },
    test () {
      console.log('xxx', this.$store.getters.currentActionData)
    }
  },
  computed: {
    friendsWorkingOnCampaign: function() {
      console.log('friends for action', this.activeUsers || {})
      console.log('myFriends', this.$store.getters.myFriends || {})
      var campaignUsers = this.activeUsers || {}
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
    },
    actualName: function () {
      var maxLength = 15
      var nameString = this.title.substring(0, maxLength)
      if (this.title.length > maxLength) {
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
.action-card-wrapper {
  padding: 20px 0;
  padding-top: 0 !important;
  width: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

@media (min-width: 720px) {
  .action-card-wrapper {
    width: 50%;
    padding: 20px 20px;
  }
}

@media (min-width: 1100px) {
  .action-card-wrapper {
    width: calc(100%/3);
    padding: 20px 20px;
  }
}

.action-title {
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
  object-fit: cover;
  object-position: center;
}

.action-card {
  flex: 1;
  border-radius: 12px;
  max-height: 250px;
  justify-content: flex-start;
}

.action-card-image {
  height: 174px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background-color: #ccc;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.action-card-row {
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

.row-with-background {
  background-color: rgba(55, 124, 183, 1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
  padding-bottom: 35px;

  & > p {
    color: white;
  }
}
</style>
