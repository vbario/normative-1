import firebaseInstance from '../util/firebase'
import firebase from 'firebase'
import router from '../router'

export const actions = {
  
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
        router.push('/home')
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
          console.log('key1', key, data.verificationKey)
          if (key == data.verificationKey) {
            firebaseInstance.database().ref('users/' + item.uid + '/emailVerified').set('true', () => {
              console.log('Verification set')
              state.commit('VERIFY_EMAIL', {})
            }).catch((error) => {
              console.log('Error getting user data', error)
            })
          }
        }
        console.log('original path:', item.fullPath)

        if ((item.fullPath !== '/login') && (item.fullPath !== '/register') && (item.fullPath.indexOf('verifyEmail') == -1)) {
          // stay here
          if (item.fullPath == '/home') {
            console.log('home path', data.myActions)
            state.dispatch('getCampaignActions', data.myActions);
          } 
        } else {
          router.push('/home')
        }
        resolve()
      }).catch((error) => {
        console.log('Error getting user data', error)
      })
    })
  },
  logout: (state, item) => {
    firebaseInstance.auth().signOut().then(() => {
      console.log('signed out...')
    }, (error) => {
      console.log('Error when logging out', error)
    })
  },
  loggedIn: (state, item) => {
    state.commit('LOGGED_IN', item)
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
    state.commit('CLEAR_SEARCH_CAMPAIGNS', {})
    firebaseInstance.database().ref('campaignsShort').orderByValue().limitToFirst(10).startAt(item.query.toLowerCase()).endAt(item.query.toLowerCase()+"\uf8ff").once('value', (snap) => {
      var campaigns = snap.val()
      console.log('campaigns returned', campaigns)
      for (var campaign in campaigns) {
        const _campaign = campaign
        console.log('get data for this campaign', campaign)
        firebaseInstance.database().ref('campaigns/' + campaign).once('value', (campaignSnap) => {
          var campaignData = campaignSnap.val()
          console.log('data for one campaign:', campaignData)
          // populate campaign
          const data = {
            id: _campaign,
            details: campaignData
          }
          state.commit('ADD_SEARCH_CAMPAIGN', data)
        }).catch((error) => {
          console.log('Error getting data for specific campaign', error)
        })
      }
      // state.commit('SAVE_COMPANY_DATA', data)
    }).catch((error) => {
      console.log('Error getting company data', error)
    })
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
    firebaseInstance.database().ref('campaigns/' + item.id).once('value', (campaignSnap) => {
      var campaignData = campaignSnap.val()
      console.log('data for one campaign:', campaignData)
      // // populate campaign
      const data = {
        id: item.id,
        details: campaignData
      }
      state.commit('CURRENT_CAMPAIGN', data)
      if (item.after == 'getActions') {
        var data2 = campaignData.actions
        state.dispatch('getCampaignActions', data2);
      }
    }).catch((error) => {
      console.log('Error getting data for specific campaign', error)
    })
  },
  getMyProjects (state, item) {
    console.log('get my projects', item)
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
  acceptAction (state, item) {
    console.log('acceptAction... action', item)
    firebaseInstance.database().ref('users/' + item.userid + '/myActions/' + item.actionid).set(true, () => {
      firebaseInstance.database().ref('campaigns/' + item.campaignid + '/activeUsers/' + item.userid).set(true, () => {
        firebaseInstance.database().ref('actions/' + item.actionid + '/activeUsers/' + item.userid).set(true, () => {
          console.log('action added')
          // route to accepted task
          // router.push('/home')
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
