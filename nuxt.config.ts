// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/plugins/firebase.client.ts'],
  ssr: false,
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        appId: process.env.FIREBASE_APP_ID
      },
      authURL: process.env.AUTH_URL
    },
    line: {
      clientID: process.env.LINE_CLIENT_ID,
      callbackURI: process.env.LINE_CALLBACK_URI,
      clientSecret: process.env.LINE_CLIENT_SECRET
    },
    firebase_admin: {
      certPath: process.env.FIREBASE_ADMIN_CERT_PATH
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  }
})
