// composables/useFirestore.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import runtimeConfig from "nitropack/dist/runtime/config";

const firebaseConfig = {
  apiKey: runtimeConfig.firebase.apiKey,
  authDomain: runtimeConfig.firebase.authDomain,
  projectId: runtimeConfig.firebase.projectId,
  appId: runtimeConfig.firebase.appId
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function useFirestore() {
  return { db }
}
