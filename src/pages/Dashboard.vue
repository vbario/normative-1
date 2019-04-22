<template>
  <div class="wrapper df fdc jcc aic jcsb">
    <DashboardHeader  v-bind:dashboardPage="dashboardPage"
                      v-bind:headerMode="headerMode"/>
    <DashboardActiveActions v-if="dashboardPage == 'home'"/>
    <DashboardProjects v-bind:myProjectDetailsList="myProjectDetailsList" v-else-if="dashboardPage == 'projects'"/>
    <DashboardCompany v-else-if="(dashboardPage == 'company') && (subPage == 'company')"/>
    <DashboardProfile v-else-if="dashboardPage == 'profile'"/>
    <DashboardCampaign v-else-if="dashboardPage == 'campaign'"/>
    <DashboardActions v-else-if="dashboardPage == 'actions'"/>
    <DashboardAction v-else-if="dashboardPage == 'action'"/>
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
import DashboardCompany from '../components/DashboardCompany'
import DashboardProfile from '../components/DashboardProfile'
import DashboardCampaign from '../components/DashboardCampaign'
import DashboardActions from '../components/DashboardActions'
import DashboardActiveActions from '../components/DashboardActiveActions'
import DashboardAction from '../components/DashboardAction'

export default {
  name: 'Dashboard',
  data () {
    return {
      myProjectDetailsList: {}
    }
  },
  props: ['dashboardPage', 'headerMode', 'subPage'],
  components: {
    DashboardHeader,
    DashboardHome,
    DashboardProjects,
    DashboardCompany,
    DashboardProfile,
    DashboardActions,
    DashboardAction,
    DashboardCampaign,
    DashboardActiveActions
    // DashboardTasks,
    // DashboardPeople,
    // DashboardBilling,
    // DashboardPricing
  },
  methods: {

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
  .wrapper {
    width: 100%;
    max-width: 1280px;
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>
