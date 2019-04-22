import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
    authError: null,
    afterEmailRecovery: null,
    uid: null,
    email: null,
    fullName: null,
    emailVerified: true,
    verificationKey: null,
    company: null,
    phone: null,
    address: null,
    city: null,
    country: null,
    province: null,
    postalCode: null,
    profileImage: null,
    companyName: null,
    companyWebsite: null,
    requestedFriends: {},
    pendingFriendRequests: {},
    companyType: null,
    companyRate: null,
    companyContingency: null,
    companyImage: null,
    newsArticles: null,
    myProjects: {},
    myProjectDetails: {},
    campaignSearchList: [],
    friendsSearchList: [],
    currentCampaignData: null,
    currentActionData: null,
    currentActions: [],
    myActiveActions: []
  },
  actions,
  mutations,
  getters,
  strict: debug
})
