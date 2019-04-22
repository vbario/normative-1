<template>
  <div class="wrap page1 f1 df fdc">
    <input v-on:input="searchFriends()" v-model="searchString" type="text" class="search-bar" placeholder="Search for new friends by name or email">
    <!-- <button v-on:click="showCampaigns()">x</button> -->
    <div class="wrap-inner f1 df fdc">
      <div v-for="(friend, index) in this.$store.getters.friendsSearchList" v-if="friend.id !== $store.getters.uid" v-bind:key="index" class="friend-found df fdr aic">
        <img class="friend-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
        <p>{{ friend.name }}</p>
        <p class="request-friend">Request</p>
      </div>
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
  name: 'DashboardCompany',
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
    this.$store.dispatch('clearSearchFriends', {
    }).then(() => {
      console.log('After clearing friends search')
    })
    // this.searchCampaigns()
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
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
</style>
