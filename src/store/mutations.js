import { types } from './mutation-types'

export const mutations = {
  [types.AUTH_ERROR] (state, item) {
    if ((item === 'auth/user-not-found') || (item === 'auth/wrong-password')) {
      state.authError = 'Incorrect e-mail or password.'
    } else if (item === 'auth/invalid-email') {
      state.authError = 'Invalid e-mail format.'
    } else if (item === 'auth/weak-password') {
      state.authError = 'Password must be at least 8 characters.'
    }
  },
  [types.SET_MENU] (state, item) {
    state.menu = item
  },
  [types.MY_FAVORITES] (state, item) {
    state.myFavorites = item
  },
  [types.ACTIVE_ORDERS_BARISTA] (state, item) {
    state.activeOrdersBarista = item
  },
  [types.ALL_STAFF] (state, item) {
    state.allStaff = item
  },
  
  [types.ACTIVE_ORDERS] (state, item) {
    state.activeOrders = item
  },
  
  [types.COMPLETED_ORDERS] (state, item) {
    state.completedOrders = item
  },
  
  [types.CLEAR_AUTH_ERROR] (state, item) {
    state.authError = null
    state.afterEmailRecovery = null
  },
  
  [types.CLEAR_SEARCH_CAMPAIGNS] (state, item) {
    state.campaignSearchList = []
  },
  
  [types.CLEAR_SEARCH_FRIENDS] (state, item) {
    state.friendsSearchList = []
  },
  
  [types.CLEAR_JUST_INVITED] (state, item) {
    state.justInvitedFriends = {}
  },
  
  [types.JUST_INVITED] (state, item) {
    state.justInvitedFriends[item] = true
  },

  [types.ADD_SEARCH_FRIEND] (state, item) {
    state.friendsSearchList.push(item)
  },

  [types.ADD_SEARCH_CAMPAIGN] (state, item) {
    state.campaignSearchList.push(item)
  },
  
  [types.CLEAR_CAMPAIGN_INVITES] (state, item) {
    state.campaignInvites = {}
  },
  
  [types.CLEAR_CURRENT_ACTIONS] (state, item) {
    state.currentActions = []
  },

  [types.ADD_CURRENT_ACTIONS] (state, item) {
    state.currentActions.push(item)
  },

  [types.CURRENT_CAMPAIGN] (state, item) {
    state.currentCampaignData = item
  },

  [types.SAVE_NEW_ACTION] (state, item) {
    state.myActiveActions[item] = true
  },

  [types.CURRENT_ACTION] (state, item) {
    state.currentActionData = item
  },

  [types.LOGGED_IN] (state, item) {
    state.uid = item.uid
  },

  [types.AFTER_EMAIL_RECOVERY] (state, item) {
    state.afterEmailRecovery = true
  },

  [types.SAVE_USER_DATA] (state, item) {
    state.userType = item.type
    state.email = item.email
    state.fullName = item.fullName
    state.emailVerified = item.emailVerified || false
    state.verificationKey = item.verificationKey
    state.company = item.company
    state.phone = item.phone
    state.address = item.address
    state.myActiveActions = item.myActions || []
    state.city = item.city
    state.requestedFriends = item.requestedFriends || {}
    state.campaignInvites = item.campaignInvites || {}
    state.myFriends = item.myFriends || {}
    state.pendingFriendRequests = item.pendingFriendRequests || {}
    state.country = item.country
    state.province = item.province
    state.postalCode = item.postalCode
    if (item.myProjects) {
      state.myProjects = item.myProjects
    }
    if (item.myCompany) {
      state.myCompany = item.myCompany
    }
    if (item.profileImage) {
      state.profileImage = item.profileImage
    }
  },

  [types.SAVE_NEW_FRIEND_REQUEST] (state, item) {
    state.requestedFriends[item.id] = item.name
  },

  [types.SAVE_NEW_FRIEND] (state, item) {
    delete state.pendingFriendRequests[item.friendid]
    state.myFriends[item.friendid] = item.friendname
  },

  [types.ADD_USER] (state, item) {
    state.employees.push(item)
  },
  
  [types.VERIFY_EMAIL] (state, item) {
    state.emailVerified = true
  },

  [types.EDIT_USER] (state, item) {
    for (let i = 0; i < state.employees.length; i++) {
      // eslint-disable-next-line
      if (state.employees[i].id == item.id) {
        state.employees[i] = Object.assign({}, state.employees[i], item)
      }
    }
  }
}
