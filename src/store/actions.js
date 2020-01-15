import firebaseInstance from '../util/firebase'
import firebase from 'firebase'
import router from '../router'

export const actions = {

  submitOrder (state, item) {
    console.log('submitting order', item)

    var random = Math.floor(Math.random() * 100000000000000000000)
    console.log('random', random)

    return firebaseInstance.database().ref('activeOrders/' + (item.userid || '-') + '/' + random).set(item).then((res) => {
      // The Promise was "fulfilled" (it succeeded).
      console.log('Success 1 while completing action', res)
      return {'status': 'ok'}
    }, function(error) {
      console.log('Error 1 while completing action', error)
      return {'status': 'error'}
    });
  },

  baristaServeOrder (state, item) {
    console.log('serving order', item)

    var data = {
      status: 'served',
      servedBox: item.boxNumber,
      dateServed: item.dateServed
    }

    return firebaseInstance.database().ref('activeOrders/' + (item.userid || '-') + '/' + (item.orderid || '-')).update(data).then((res) => {
      console.log('Success 5 while completing action', res)
      return {'status': 'ok'}
    }, function(error) {
      console.log('Error 5 while completing action', error)
      return {'status': 'error'}
    });
  },

  baristaStartOrder (state, item) {
    console.log('starting order', item)

    var data = {
      status: 'started',
      dateStarted: item.dateStarted,
      barista_name: item.barista_name,
      barista_id: item.barista_id,
    }

    return firebaseInstance.database().ref('activeOrders/' + (item.userid || '-') + '/' + (item.orderid || '-')).update(data).then((res) => {
      console.log('Success 3 while completing action', res)
      return {'status': 'ok'}
    }, function(error) {
      console.log('Error 3 while completing action', error)
      return {'status': 'error'}
    });
  },
  completeOrder (state, item) {
    console.log('completing order', item)
    return firebaseInstance.database().ref('activeOrders/' + (item.userid || '-') + '/' + (item.orderid || '-')).update({
      status: 'completed',
      dateCompleted: item.date
    }).then((res) => {
      // The Promise was "fulfilled" (it succeeded).
      console.log('Success 2 while completing action', res)
      return {'status': 'ok'}
    }, function(error) {
      console.log('Error 2 while completing action', error)
      return {'status': 'error'}
    });
  },
  openOrder (state, item) {
    console.log('completing order', item)
    return firebaseInstance.database().ref('activeOrders/' + (item.userid || '-') + '/' + (item.orderid || '-')).update({
      status: 'open',
      dateCompleted: item.date
    }).then((res) => {
      // The Promise was "fulfilled" (it succeeded).
      console.log('Success 2 while completing action', res)
      return {'status': 'ok'}
    }, function(error) {
      console.log('Error 2 while completing action', error)
      return {'status': 'error'}
    });
  },
  watchActiveOrders (state, item) {
    console.log('watchActiveOrders', item)
    firebaseInstance.database().ref('/activeOrders/' + (item.uid || '-')).on('value', (snap) => {
      var orders = snap.val()
      var activeOrders = []
      for (var order in orders) {
        var oneOrder = {
          orderid: order,
          order: orders[order]
        }
        if (orders[order].status == 'active' ||
           orders[order].status == 'started' ||
           orders[order].status == 'served' ||
           orders[order].status == 'open' ||
           orders[order].status == 'ready') {
          activeOrders.push(oneOrder)
        }
      }
      console.log('orders', activeOrders)
      state.commit('ACTIVE_ORDERS', activeOrders)
    })
  },
  getStoreStaff (state, item) {
    console.log('getStoreStaff', item)
    firebaseInstance.database().ref('/staff').once('value', (snap) => {
      console.log('staff->', snap.val())
      var staffs = snap.val()
      var allStaff = []


      // color, id, name
      
      for (var staff in staffs) {
        var orders = staffs[staff]
        var oneStaff = {
          staffid: staff,
          staff: staffs[staff]
        }
        // if (orders[order].status == 'active' ||
           // orders[order].status == 'ready') {
          allStaff.push(oneStaff)
        // }
      }

      console.log('staff', allStaff)
      state.commit('ALL_STAFF', allStaff)
    }).catch((error) => {
      console.log('error getStoreStaff', error)
    })
  },
  watchBaristaOrders (state, item) {
    console.log('watchActiveOrders', item)
    firebaseInstance.database().ref('/activeOrders').on('value', (snap) => {
      var users = snap.val()
      var activeOrders = []
      
      for (var user in users) {
        var orders = users[user]
        for (var order in orders) {
          var oneOrder = {
            orderid: order,
            order: orders[order]
          }
          // if (orders[order].status == 'active' ||
             // orders[order].status == 'ready') {
            activeOrders.unshift(oneOrder)
          // }
        }
      }

      console.log('orders', activeOrders)
      state.commit('ACTIVE_ORDERS_BARISTA', activeOrders)
    })
  },
  
  forgotPassword: (state, item) => {
    var auth = firebase.auth()
    auth.sendPasswordResetEmail(item.email).then(() => {
      console.log('sent recovery email')
      state.commit('AFTER_EMAIL_RECOVERY', {})
    }).catch((error) => {
      console.log('error sending recovery email', error)
      state.commit('AFTER_EMAIL_RECOVERY', {})
    })
  },
  register: (state, item) => {
    var register = firebaseInstance.auth().createUserWithEmailAndPassword(item.email, item.password)
    register.then((snap) => {
      console.log('registered', snap)
      var data = snap.user

      var key = Math.ceil(Math.random() * 1000000000)
      var companyKey = ''
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (var i = 32; i > 0; --i) companyKey += chars[Math.floor(Math.random() * chars.length)]

      var object = {
        fullName: item.fullName,
        email: item.email,
        emailVerified: false,
        verificationKey: key
      }

      var shortObject = item.fullName.toLowerCase()

      // var companyObject = {
      //   name: 'My Company',
      //   website: 'www.mycompany.com',
      //   type: 'Digital Agency',
      //   rate: '150',
      //   contingency: '10',
      //   image: ''
      // }

      firebaseInstance.database().ref('users/' + data.uid).set(object, () => {
        console.log('saved user data')
        state.commit('SAVE_USER_DATA', object)
        var user = firebaseInstance.auth().currentUser

        // var actionCodeSettings = {
        //   url: 'https://betterplace-dev.firebaseapp.com/verifyEmail/' + key
        // }
        // user.sendEmailVerification(actionCodeSettings).then(() => {
          // console.log('sent verification email')
          // create company
          firebaseInstance.database().ref('usersShort/' + data.uid).set(shortObject, () => {
            console.log('short user created created')
            state.commit('CLEAR_AUTH_ERROR', {})
          }).catch((error) => {
            console.log('Error creating company', error)
          })
        // }).catch((error) => {
        //   console.log('error sending verification email', error)
        // })
        router.push('/main')
      }).catch((error) => {
        console.log('Error getting user data', error)
      })
    }).catch((error) => {
      console.log('Error registering account', error)
      state.commit('AUTH_ERROR', error.code)
    })
  },
  verifyKey: (state, item) => {
    console.log('verifying key action', item)
    firebaseInstance.database().ref('users/' + item.uid + '/verificationKey').once('value', (snap) => {
      var testKey = snap.val()
      console.log('keys', testKey, item.key)
      // state.commit('SAVE_USER_DATA', data)
    }).catch((error) => {
      console.log('Error getting user data', error)
    })
  },
  login: (state, item) => {
    var signIn = firebaseInstance.auth().signInWithEmailAndPassword(item.email, item.password)
    signIn.then((data) => {
      console.log('Firebase Authorized', data)
      state.commit('CLEAR_AUTH_ERROR', {})
      router.push('/home')
    }).catch((error) => {
      console.log('Firebase Auth Error:', error)
      state.commit('AUTH_ERROR', error.code)
    })
  },
  clearAuthError: (state, item) => {
    state.commit('CLEAR_AUTH_ERROR', {})
  },
  logout: (state, item) => {
    firebaseInstance.auth().signOut().then(() => {
      console.log('signed out...')
    }, (error) => {
      console.log('Error when logging out', error)
    })
  },
  loggedIn: (state, item) => { // sets the uid
    state.commit('LOGGED_IN', item)
  },
  getUserData: (state, item) => {
    return new Promise((resolve, reject) => {
      console.log('get data for user', item.uid)
      firebaseInstance.database().ref('users/' + item.uid).once('value', (snap) => {
        var data = snap.val()
        console.log('got response', data)
        state.commit('SAVE_USER_DATA', data)

        var _path = item.path
        if (_path == 'verifyEmail') {
          var key = item.key
          if (key == data.verificationKey) {
            firebaseInstance.database().ref('users/' + item.uid + '/emailVerified').set('true', () => {
              state.commit('VERIFY_EMAIL', {})
            }).catch((error) => {
              console.log('Error getting user data', error)
            })
          }
        }

        if ((item.fullPath !== '/login') && (item.fullPath !== '/register') && (item.fullPath.indexOf('verifyEmail') == -1)) {
          if (item.fullPath == '/home') {
            if (!data.type) {
              router.push('/main')
            } 
            // state.dispatch('getCampaignActions', data.myActions);
          } 
        } else {
          if (data.type == 'admin') {
            router.push('/home')
          } else if (data.type == 'bar') {
            router.push('/home')
          } else {
            router.push('/main')
          } 
        }
        resolve()
      }).catch((error) => {
        console.log('Error getting user data', error)
      })
    })
  },






  getCompanyInfo (state, item) {
    // firebaseInstance.database().ref('companies/' + item.myCompany).once('value', (snap) => {
    //   var companyInfo = snap.val()
    //   console.log('companyInfo', companyInfo)

    //   var data = {
    //     name: companyInfo.name,
    //     website: companyInfo.website,
    //     type: companyInfo.type,
    //     rate: companyInfo.rate,
    //     image: companyInfo.image,
    //     contingency: companyInfo.contingency
    //   }

    //   state.commit('SAVE_COMPANY_DATA', data)
    // }).catch((error) => {
    //   console.log('Error getting company data', error)
    // })
  },
  clearSearchFriends (state, item) {
    state.commit('CLEAR_SEARCH_FRIENDS', {})
  },
  searchFriends (state, item) {
    console.log('searchFriends action', item)
    // clear existing campaigns
    state.commit('CLEAR_SEARCH_FRIENDS', {})
    firebaseInstance.database().ref('usersShort').orderByValue().limitToFirst(10).startAt(item.query.toLowerCase()).endAt(item.query.toLowerCase()+"\uf8ff").once('value', (snap) => {
      var friends = snap.val()
      console.log('friends returned', friends)
      for (var friend in friends) {
        const _friend = friend
        const _name = friends[_friend]
        console.log('get data for this friend', _friend, _name)
        // firebaseInstance.database().ref('campaigns/' + campaign).once('value', (campaignSnap) => {
        //   var campaignData = campaignSnap.val()
        //   console.log('data for one campaign:', campaignData)
        //   // populate campaign
        const data = {
          id: _friend,
          name: _name
        }
        state.commit('ADD_SEARCH_FRIEND', data)
        // }).catch((error) => {
        //   console.log('Error getting data for specific campaign', error)
        // })
      }
      // state.commit('SAVE_COMPANY_DATA', data)
    }).catch((error) => {
      console.log('Error getting company data', error)
    })
  },
  searchCampaigns (state, item) {
    console.log('searchCampaigns action', item)
    // clear existing campaigns
    // state.commit('CLEAR_SEARCH_CAMPAIGNS', {})
    // firebaseInstance.database().ref('campaignsShort').orderByValue().limitToFirst(10).startAt(item.query.toLowerCase()).endAt(item.query.toLowerCase()+"\uf8ff").once('value', (snap) => {
    //   var campaigns = snap.val()
    //   console.log('campaigns returned', campaigns)
    //   for (var campaign in campaigns) {
    //     const _campaign = campaign
    //     console.log('get data for this campaign', campaign)
    //     firebaseInstance.database().ref('campaigns/' + campaign).once('value', (campaignSnap) => {
    //       var campaignData = campaignSnap.val()
    //       console.log('data for one campaign:', campaignData)
    //       // populate campaign
    //       const data = {
    //         id: _campaign,
    //         details: campaignData
    //       }
    //       state.commit('ADD_SEARCH_CAMPAIGN', data)
    //     }).catch((error) => {
    //       console.log('Error getting data for specific campaign', error)
    //     })
    //   }
    //   // state.commit('SAVE_COMPANY_DATA', data)
    // }).catch((error) => {
    //   console.log('Error getting company data', error)
    // })
  },
  getCampaignActions (state, item) {
    state.commit('CLEAR_CURRENT_ACTIONS', {})
    console.log('getCampaignActions action', item)
    for (var action in item) {
        const _action = action
        const _id = item[_action]
        const useThisId = item[_action] === true ? _action : item[_action]
        console.log('get data for this action', useThisId)
        firebaseInstance.database().ref('actions/' + useThisId).once('value', (actionSnap) => {
          var actionData = actionSnap.val()
          console.log('data for one action:', actionData)
          // populate campaign
          const data = {
            id: useThisId,
            details: actionData
          }
          state.commit('ADD_CURRENT_ACTIONS', data)
        }).catch((error) => {
          console.log('Error getting data for specific action', error)
        })
    }
  },
  getActionData (state, item) {
    console.log('getCampaignData action')
    firebaseInstance.database().ref('actions/' + item.id).once('value', (actionSnap) => {
      var actionData = actionSnap.val()
      console.log('data for current action:', actionData)
      // // populate action
      const data = {
        id: item.id,
        details: actionData
      }
      state.commit('CURRENT_ACTION', data)
      // if (item.after == 'getActions') {
      //   var data2 = actionData.actions
      //   state.dispatch('getCampaignActions', data2);
      // }
    }).catch((error) => {
      console.log('Error getting data for specific action', error)
    })
  },
  getCampaignData (state, item) {
    console.log('getCampaignData action')
    // firebaseInstance.database().ref('campaigns/' + item.id).once('value', (campaignSnap) => {
    //   var campaignData = campaignSnap.val()
    //   console.log('data for one campaign:', campaignData)
    //   // // populate campaign
    //   const data = {
    //     id: item.id,
    //     details: campaignData
    //   }
    //   state.commit('CURRENT_CAMPAIGN', data)
    //   if (item.after == 'getActions') {
    //     var data2 = campaignData.actions
    //     state.dispatch('getCampaignActions', data2);
    //   }
    // }).catch((error) => {
    //   console.log('Error getting data for specific campaign', error)
    // })
  },
  getMyProjects (state, item) {
    console.log('get my projects', item)
  },
  acceptCampaignInvite (state, item) {
    console.log('acceptCampaignInvite... action', item)
    firebaseInstance.database().ref('users/' + item.myid + '/campaignInvites/' + item.campaignid).remove(() => {
      console.log('campaign invite accepted')
      state.commit('CLEAR_CAMPAIGN_INVITES', {})
      router.push('/campaign/' + item.campaignid)
    }).catch((error) => {
      console.log('Error accepting campaign invite', error)
    })
  },
  clearInvitedFriends (state, item) {
    state.commit('CLEAR_JUST_INVITED', {})
  },
  inviteFriendToCampaign (state, item) {
    console.log('acceptAction... action', item)

    var inviteObject = {
      userID: item.myid,
      userName: item.myname,
      campaignName: item.campaignName
    }
    
    firebaseInstance.database().ref('users/' + item.friendid + '/campaignInvites/' + item.campaignid).set(inviteObject, () => {
      console.log('friend invite added')
      state.commit('JUST_INVITED', item.friendid)
      state.dispatch('searchFriends', {query: ''});
      // route to accepted task
      // router.push('/home')
    }).catch((error) => {
      console.log('Error inviting friend to campaign', error)
    })
  },
  requestFriend (state, item) {
    console.log('acceptAction... action', item)
    firebaseInstance.database().ref('users/' + item.friendid + '/pendingFriendRequests/' + item.myid).set(item.myname, () => {
      console.log('friend requested1')
      firebaseInstance.database().ref('users/' + item.myid + '/requestedFriends/' + item.friendid).set(item.friendname, () => {
        console.log('friend requested')
        state.commit('SAVE_NEW_FRIEND_REQUEST', {id: item.friendid, name: item.friendname})
        state.dispatch('searchFriends', {query: item.searchString});
        // firebaseInstance.database().ref('actions/' + item.actionid + '/activeUsers/' + item.userid).set(true, () => {
        //   console.log('action added')
        //   // route to accepted task
        //   // router.push('/home')
        // }).catch((error) => {
        //   console.log('Error 3 while adding action', error)
        // })
      }).catch((error) => {
        console.log('Error 2 while requesting friend', error)
      })
    }).catch((error) => {
      console.log('Error 1 while requesting friend', error)
    })
  },
  acceptFriend (state, item) {
    console.log('acceptFriend action', item)
    // myid, friendid, myname, friendname
    firebaseInstance.database().ref('users/' + item.myid + '/pendingFriendRequests/' + item.friendid).remove(() => {
      console.log('friend requested1')
      firebaseInstance.database().ref('users/' + item.friendid + '/requestedFriends/' + item.myid).remove(() => {
        firebaseInstance.database().ref('users/' + item.myid + '/myFriends/' + item.friendid).set(item.friendname, () => {
          console.log('friend requested1')
          firebaseInstance.database().ref('users/' + item.friendid + '/myFriends/' + item.myid).set(item.myname, () => {
            console.log('friend accepted')
            state.commit('SAVE_NEW_FRIEND', {friendid: item.friendid, friendname: item.friendname})
            state.dispatch('searchFriends', {query: item.searchString});
            // state.dispatch('searchFriends', {query: item.searchString});
            // firebaseInstance.database().ref('actions/' + item.actionid + '/activeUsers/' + item.userid).set(true, () => {
            //   console.log('action added')
            //   // route to accepted task
            //   // router.push('/home')
            // }).catch((error) => {
            //   console.log('Error 3 while adding action', error)
            // })
          }).catch((error) => {
            console.log('Error 4 while requesting friend', error)
          })
        }).catch((error) => {
          console.log('Error 3 while requesting friend', error)
        })
      }).catch((error) => {
        console.log('Error 2 while requesting friend', error)
      })
    }).catch((error) => {
      console.log('Error 1 while requesting friend', error)
    })
  },
  completeAction (state, item) {
    console.log('completeAction... action', item)
    // remove me from activeUsers in campaign
    // remove me from activeUsers in action
    // set my myActions action variable to false

    firebaseInstance.database().ref('users/' + item.userid + '/myActions/' + item.actionid).remove(() => {
      firebaseInstance.database().ref('campaigns/' + item.campaignid + '/activeUsers/' + item.userid).remove(() => {
        firebaseInstance.database().ref('actions/' + item.actionid + '/activeUsers/' + item.userid).remove(() => {
          console.log('action completed')
          router.push('/home')
          // route to accepted task
          // router.push('/home')
        }).catch((error) => {
          console.log('Error 3 while completing action', error)
        })
      }).catch((error) => {
        console.log('Error 2 while completing action', error)
      })
    }).catch((error) => {
      console.log('Error 1 while completing action', error)
    })
  },
  acceptAction (state, item) {
    console.log('acceptAction... action', item)
    firebaseInstance.database().ref('users/' + item.userid + '/myActions/' + item.actionid).set(true, () => {
      firebaseInstance.database().ref('campaigns/' + item.campaignid + '/activeUsers/' + item.userid).set(true, () => {
        firebaseInstance.database().ref('actions/' + item.actionid + '/activeUsers/' + item.userid).set(true, () => {
          console.log('action added')
          // route to accepted task
          state.commit('SAVE_NEW_ACTION', item.actionid)
          router.push('/home')
        }).catch((error) => {
          console.log('Error 3 while adding action', error)
        })
      }).catch((error) => {
        console.log('Error 2 while adding action', error)
      })
    }).catch((error) => {
      console.log('Error 1 while adding action', error)
    })
  }
}
