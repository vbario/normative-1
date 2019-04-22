export const getters = {
  uid (state) {
    return state.uid
  },

  userData (state) {
    var data = {
      fullName: state.fullName,
      email: state.email,
      emailVerified: state.emailVerified,
      verificationKey: state.verificationKey,
      company: state.company,
      myCompany: state.myCompany,
      phone: state.phone,
      address: state.address,
      city: state.city,
      country: state.country,
      province: state.province,
      myFriends: state.myFriends,
      myActiveActions: state.myActiveActions,
      pendingFriendRequests: state.pendingFriendRequests,
      profileImage: state.profileImage,
      postalCode: state.postalCode,
      companyName: state.companyName,
      requestedFriends: state.requestedFriends,
      companyWebsite: state.companyWebsite,
      companyType: state.companyType,
      companyRate: state.companyRate,
      companyContingency: state.companyContingency,
      companyImage: state.companyImage
    }
    return data
  },

  fullName (state) {
    return state.fullName
  },

  pendingFriendRequests (state) {
    return state.pendingFriendRequests || {}
  },

  myFriends (state) {
    return state.myFriends || {}
  },

  requestedFriends (state) {
    return state.requestedFriends || {}
  },

  myActiveActions (state) {
    return state.myActiveActions
  },

  currentCampaignData (state) {
    return state.currentCampaignData
  },

  currentActionData (state) {
    return state.currentActionData
  },
  
  currentActions (state) {
    return state.currentActions
  },

  campaignSearchList (state) {
    return state.campaignSearchList
  },

  friendsSearchList (state) {
    return state.friendsSearchList
  },

  authError (state) {
    return state.authError
  },

  afterEmailRecovery (state) {
    return state.afterEmailRecovery
  },

  companyName (state) {
    return state.companyName
  }
}
