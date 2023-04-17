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
      }
    },
    line: {
      clientID: process.env.LINE_CLIENT_ID,
      callbackURI: process.env.LINE_CALLBACK_URI
    }
  }
})
