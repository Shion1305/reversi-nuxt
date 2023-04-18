import * as admin from 'firebase-admin'

const config = useRuntimeConfig()
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase_admin.certPath)
  })
}

export default admin
