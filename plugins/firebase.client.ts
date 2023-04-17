import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    appId: config.firebase.appId
  }
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  // Firestoreに接続するための情報をアプリケーション全体に提供
  nuxtApp.provide('db', db)
})
