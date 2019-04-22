<template>
  <div class="wrap page1 f1 df fdc">
    <!-- <input v-on:input="searchCampaigns()" v-model="searchString" type="text" class="search-bar" placeholder="Search actions and campaigns"> -->
    <!-- <button v-on:click="showCampaigns()">x</button> -->
    <div class="wrap-inner f1 df fdc">
      <div class="campaign-row title-row">
        <p>Explore Actions</p>
      </div>
      <!-- <p v-if="this.$store.getters.currentActions.length == 0">{{ loadingText }}</p> -->
      <div class="actions-wrapper df fdr f1">
        <ActionCard v-for="(action, index) in this.$store.getters.currentActions"
                    v-bind:key="index"
                    v-bind:title="action.details.title"
                    v-bind:activeUsers="action.details.activeUsers"
                    v-bind:image="action.details.image"
                    v-bind:id="action.id"
                    v-bind:text="action.details.text"/>
      </div>
    </div>
  </div>
</template>

<script>
import ActionCard from './ActionCard'
export default {
  name: 'Actions',
  data () {
    return {
      loadingText: 'No actions'
      // mode: 'login' // login/register
    }
  },
  props: [],
  components: {
    ActionCard
  },
  methods: {
  },
  computed: {

  },
  created () {
    console.log('** Actions Component Loaded', this.$route)
    var campaignID = this.$route.params.id
    this.$store.dispatch('getCampaignData', {
      id: campaignID,
      after: 'getActions'
    }).then(() => {
      console.log('After getting campaign data')
    })
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
  padding-top: 0;
}
.actions-wrapper {
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>
