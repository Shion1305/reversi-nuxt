import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// tried to replace with useRuntimeConfig().public but was unable to load useRuntimeConfig
const firebaseConfig = {
  apiKey: 'AIzaSyAXS55p_9dlpwEAGDSgxIMZAEWQQkwrEwE',
  authDomain: 'ynuprojectlearning2023-04.firebaseapp.com',
  projectId: 'ynuprojectlearning2023-04',
  storageBucket: 'ynuprojectlearning2023-04.appspot.com',
  messagingSenderId: '808452933891',
  appId: '1:808452933891:web:9e3763cfcc5d1a5c318136'
}

// const firebaseConfig = {
//   apiKey: config.firebase.apiKey,
//   authDomain: config.firebase.authDomain,
//   projectId: config.firebase.projectId,
//   appId: config.firebase.appId
// }

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig)

  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  nuxtApp.provide('firebaseAnalytics', analytics)
  nuxtApp.provide('firebaseAuth', auth)
  nuxtApp.provide('firebaseFirestore', firestore)
})
