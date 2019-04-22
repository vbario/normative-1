<template>
  <div class="wrap page1 f1 df fdc">
    <!-- <input v-on:input="searchFriends()" v-model="searchString" type="text" class="search-bar" placeholder="Search for new friends by name or email"> -->
    <!-- <button v-on:click="showCampaigns()">x</button> -->
    <div class="wrap-inner f1 df fdc">
      <h2 v-on:click="test">My Friends</h2>
      <div v-for="(friend, index) in this.$store.getters.myFriends" v-if="(friend.id !== $store.getters.uid) && (!$store.getters.pendingFriendRequests[friend.id])" v-bind:key="index" class="friend-found df fdr aic">
        <img class="friend-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
        <p v-on:click="test(friend.id)">{{ friend }}</p>
        <p v-if="$store.getters.justInvitedFriends[index]" class="request-friend request-sent">Sent</p>
        <p v-else class="request-friend" v-on:click="inviteFriendToCampaign(index)">Invite</p>
      </div>


      <!-- <h2>Search Results</h2>  -->
      <div v-for="(friend, index) in this.$store.getters.friendsSearchList" v-if="(friend.id !== $store.getters.uid) && (!$store.getters.pendingFriendRequests[friend.id]) && (!$store.getters.myFriends[friend.id])" v-bind:key="index" class="hidden friend-found df fdr aic">
        <!-- <img class="friend-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
        <p v-on:click="test(friend.id)">{{ friend.name }}</p>
        <p v-if="$store.getters.requestedFriends[friend.id]" class="request-friend request-sent">Sent</p>
        <p v-else class="request-friend" v-on:click="requestFriend(friend.id, friend.name)">Request</p> -->
      </div><!-- 
      <h2>Friend Requests</h2>
      <div v-for="(friend, index) in this.$store.getters.pendingFriendRequests" v-bind:key="index" class="friend-found existing-friend df fdr aic">
        <img class="friend-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
        <p v-on:click="test()">Pending: {{ friend }}</p>
        <p v-if="$store.getters.requestedFriends[friend.id]" class="request-friend request-sent">Sent</p>
        <p class="request-friend" v-on:click="acceptFriend(index, friend)">Accept</p>
      </div> -->
<!--       <CampaignCard v-for="(campaign, index) in this.$store.getters.campaignSearchList"
                    v-bind:key="index"
                    v-bind:name="campaign.details.name"
                    v-bind:cardImage="campaign.details.cardImage"
                    v-bind:id="campaign.id"
                    v-bind:text="campaign.details.text"/> -->
    </div>
  </div>
</template>

<script>
// import CampaignCard from './CampaignCard'
// import CompanyInfo from './CompanyInfo'
// import CompanyInfoEdit from './CompanyInfoEdit'

export default {
  name: 'DashboardInviteToCampaign',
  data () {
    return {
      mode: 'view', // or edit
      searchString: ''
    }
  },
  props: [],
  components: {
    // CampaignCard
    // SideBarProfile,
    // CompanyInfo,
    // CompanyInfoEdit
  },
  methods: {
    test (id) {
      console.log('...', this.$store.getters.justInvitedFriends)
    },
    inviteFriendToCampaign (friendid) {
      this.$store.dispatch('inviteFriendToCampaign', {
        myid: this.$store.getters.uid,
        friendid: friendid,
        campaignid: this.$route.params.campaignid,
        myname: this.$store.getters.fullName,
        campaignName: this.$route.query.campaignname
      }).then(() => {
        console.log('After inviting friend to campaign')
      })
    },
    acceptFriend (id, name) {
      console.log('accept friend with id', id)
      this.$store.dispatch('acceptFriend', {
        friendid: id,
        myid: this.$store.getters.uid,
        myname: this.$store.getters.fullName,
        friendname: name,
        searchString: this.searchString
      }).then(() => {
        console.log('After accepting friend')
      })
    },
    requestFriend (id, name) {
      console.log('request friend', id)
      this.$store.dispatch('requestFriend', {
        friendid: id,
        myid: this.$store.getters.uid,
        searchString: this.searchString,
        myname: this.$store.getters.fullName,
        friendname: name
      }).then(() => {
        console.log('After requesting friend')
      })
    },
    searchFriends () {
      console.log('Searching for friends with string:', this.searchString)
      this.$store.dispatch('searchFriends', {
        query: this.searchString
      }).then(() => {
        console.log('After searching friends', this.$store.getters.friendsSearchList)
      })
    }
  },
  computed: {

  },
  created () {
    this.$store.dispatch('clearInvitedFriends', {
    }).then(() => {
      console.log('After clearing invited friends')
    })
    // this.searchCampaigns()
    console.log('** Invite to campaign Component Loaded', this.$route.query.campaignname)
  }
}
</script>

<style scoped lang="scss">
h2 {
  color: #333333;
}
.wrap {
  width: 100%;
  padding: 0;
}
.wrap-inner {
  padding: 50px;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-top: 15px;
  align-items: flex-start;
}
.request-friend {
  border: 1px solid #007bff;
  padding: 10px;
  border-radius: 20px;
  color: #007bff;
  transition: all 0.5s;

  &:hover {
    background-color: #007bff;
    color: white;
  }  
}

.request-sent {
  border-color: #28a745;
  color: #28a745;

  &:hover {
    background-color: unset;
    color: #28a745;
  }
}

.friend-found {
  height: 100px;
  width: 100%;
  justify-content: flex-start;

  & > img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  & > p:first-of-type {
    font-weight: 600;
  }

  & > * {
    margin-right: 20px;
  }
}

.hidden {
  opacity: 0;
}
</style>
