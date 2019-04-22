import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDZrhSgLhOiFqdH8h2liWkCf7JDfpX-RAI',
  authDomain: 'betterplace-dev.firebaseapp.com',
  databaseURL: 'https://betterplace-dev.firebaseio.com',
  projectId: 'betterplace-dev',
  storageBucket: 'betterplace-dev.appspot.com',
  messagingSenderId: '484093582021'
}
const firebaseInstance = firebase.initializeApp(config)

export default firebaseInstance
