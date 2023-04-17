import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const config = useRuntimeConfig().public

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  appId: config.firebase.appId
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig)

  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
})
