import admin from 'firebase-admin'
import * as fs from 'fs'

const config = useRuntimeConfig()
// read json file from FileSystem and parse it as json object

if (config.firebase_admin.certPath) {
  const credential = JSON.parse(
    fs.readFileSync(config.firebase_admin.certPath, 'utf8')
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential as admin.ServiceAccount)
  })
} else {
  admin.initializeApp()
}

export default admin
