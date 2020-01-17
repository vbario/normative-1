<template>
  <div class="wrapper df fdc jcc aic jcsb">
    <DashboardHeader  v-bind:dashboardPage="dashboardPage"
                      v-bind:headerMode="headerMode"
                      v-bind:backButton="backButton"
                      v-bind:setBackButton="setBackButton"/>
    <DashboardActiveActions v-if="dashboardPage == 'home'"/>
    <DashboardProjects v-bind:myProjectDetailsList="myProjectDetailsList" v-else-if="dashboardPage == 'projects'"/>
    <DashboardCompany v-else-if="(dashboardPage == 'company') && (subPage == 'company')"/>
    <DashboardMain v-else-if="(dashboardPage == 'main')" v-bind:setBackButton="setBackButton"/>
    <DashboardBarista v-else-if="(dashboardPage == 'barista')"/>
    <DashboardServer v-else-if="(dashboardPage == 'server')"/>
    <DashboardProfile v-else-if="dashboardPage == 'profile'"/>
    <DashboardCampaign v-else-if="dashboardPage == 'campaign'"/>
    <DashboardActions v-else-if="dashboardPage == 'actions'"/>
    <DashboardAction v-else-if="dashboardPage == 'action'"/>
    <DashboardInviteToCampaign v-else-if="dashboardPage == 'inviteFriendToCampaign'"/>
    <!-- <DashboardTasks v-else-if="dashboardPage == 'tasks'"/>
    <DashboardPeople v-else-if="dashboardPage == 'people'"/>
    <DashboardPricing v-else-if="(dashboardPage == 'company') && (subPage == 'pricing')"/>
    <DashboardBilling v-else-if="dashboardPage == 'billing'"/> -->
  </div>
</template>

<script>
import DashboardHeader from '../components/DashboardHeader'
import DashboardHome from '../components/DashboardHome'
import DashboardProjects from '../components/DashboardProjects'
import DashboardMain from '../components/DashboardMain'
import DashboardBarista from '../components/DashboardBarista'
import DashboardServer from '../components/DashboardServer'
import DashboardCompany from '../components/DashboardCompany'
import DashboardProfile from '../components/DashboardProfile'
import DashboardCampaign from '../components/DashboardCampaign'
import DashboardActions from '../components/DashboardActions'
import DashboardActiveActions from '../components/DashboardActiveActions'
import DashboardAction from '../components/DashboardAction'
import DashboardInviteToCampaign from '../components/DashboardInviteToCampaign'

export default {
  name: 'Dashboard',
  data () {
    return {
      backButton: false,
      myProjectDetailsList: {}
    }
  },
  props: ['dashboardPage', 'headerMode', 'subPage'],
  components: {
    DashboardHeader,
    DashboardHome,
    DashboardProjects,
    DashboardCompany,
    DashboardMain,
    DashboardBarista,
    DashboardServer,
    DashboardProfile,
    DashboardActions,
    DashboardAction,
    DashboardCampaign,
    DashboardActiveActions,
    DashboardInviteToCampaign
    // DashboardTasks,
    // DashboardPeople,
    // DashboardBilling,
    // DashboardPricing
  },
  methods: {
    setBackButton(backButton) {
      console.log('backButton', backButton)
      this.backButton = backButton
    }
  },
  computed: {

  },
  watch: {
  },
  created () {
    console.log('* Loaded dashboard page')
    this.$store.watch(()=> {
      return this.$store.getters.myProjectListWithDetails
    }, () => {
      console.log('---->')
    })


    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'ADD_PROJECT':
          console.log('*** project added', state.myProjectDetails)
          setTimeout(() => {
            this.myProjectDetailsList = this.$store.getters.myProjectListWithDetails
          }, 100)
          break
        case 'REMOVE_PROJECT':
          console.log('*** project removed', state.myProjectDetails)
          setTimeout(() => {
            this.myProjectDetailsList = this.$store.getters.myProjectListWithDetails
          }, 100)
          break
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  .wrapper {
    width: 100%;
    /*max-width: 1280px;*/
    min-height: 100vh;
    /*position: fixed;*/
    overflow-x: hidden;
    overflow-y: auto;
    top: 0;
  }
</style>
