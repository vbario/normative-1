import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/pages/Landing'
import DashboardPage from '@/pages/Dashboard'
import VerifyPage from '@/components/VerifyPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      props: { mode: 'login' }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LandingPage,
      props: { mode: 'login' }
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: LandingPage,
      props: { mode: 'register' }
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPasswordPage',
      component: LandingPage,
      props: { mode: 'forgotPassword' }
    },
    {
      path: '/home',
      name: 'HomePage',
      component: DashboardPage,
      props: { dashboardPage: 'home', headerMode: 'full' }
    },
    {
      path: '/verifyEmail/:verificationKey',
      name: 'VerifyPage',
      component: VerifyPage
    },
    {
      path: '/explore',
      name: 'CompanyPage',
      component: DashboardPage,
      props: { dashboardPage: 'company', headerMode: 'full', subPage: 'company' }
    },
    {
      path: '/server',
      name: 'MainPage',
      component: DashboardPage,
      props: { dashboardPage: 'server' }
      // props: { dashboardPage: 'main', headerMode: 'full' }
    },
    {
      path: '/barista',
      name: 'MainPage',
      component: DashboardPage,
      props: { dashboardPage: 'barista' }
      // props: { dashboardPage: 'main', headerMode: 'full' }
    },
    {
      path: '/main',
      name: 'MainPage',
      component: DashboardPage,
      props: { dashboardPage: 'main' }
      // props: { dashboardPage: 'main', headerMode: 'full' }
    },
    {
      path: '/friends',
      name: 'ProjectsPage',
      component: DashboardPage,
      props: { dashboardPage: 'projects', headerMode: 'full' }
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: DashboardPage,
      props: { dashboardPage: 'profile', headerMode: 'full2' }
    },
     {
      path: '/campaign/:id',
      name: 'CampaignPage',
      component: DashboardPage,
      props: { dashboardPage: 'campaign', headerMode: 'full' }
    },
     {
      path: '/campaign/:id/actions',
      name: 'ActionsPage',
      component: DashboardPage,
      props: { dashboardPage: 'actions', headerMode: 'full' }
    },
    {
      path: '/action/:actionid',
      name: 'ActionPage',
      component: DashboardPage,
      props: { dashboardPage: 'action', headerMode: 'full' }
    },
    {
      path: '/inviteFriendToCampaign/:campaignid',
      name: 'InviteToCampaignPage',
      component: DashboardPage,
      props: { dashboardPage: 'inviteFriendToCampaign', headerMode: 'full' }
    }
  ]
})
