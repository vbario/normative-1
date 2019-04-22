<template>
  <div class="wrap page1 f1 df fdc">
    <input v-on:input="searchCampaigns()" v-model="searchString" type="text" class="search-bar" placeholder="Search actions and campaigns">
    <!-- <button v-on:click="showCampaigns()">x</button> -->
    <div class="wrap-inner f1 df fdr">
      <CampaignCard v-for="(campaign, index) in this.$store.getters.campaignSearchList"
                    v-bind:key="index"
                    v-bind:name="campaign.details.name"
                    v-bind:cardImage="campaign.details.cardImage"
                    v-bind:activeUsers="campaign.details.activeUsers || {}"
                    v-bind:id="campaign.id"
                    v-bind:text="campaign.details.text"/>
    </div>
  </div>
</template>

<script>
import CampaignCard from './CampaignCard'
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
    CampaignCard
    // SideBarProfile,
    // CompanyInfo,
    // CompanyInfoEdit
  },
  methods: {
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
}
.wrap-inner {
  padding: 50px;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>
