<script setup>
const config = useRuntimeConfig()

const loginURL =
  'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=' +
  config.line.clientID +
  '&redirect_uri=' +
  config.line.callbackURI +
  '&state=' +
  'test111' +
  '&scope=openid%20profile%20email'
</script>
<template>
    <div>Welcome to login!!</div>
    <h1>Login</h1>
    <div><span>Username: </span><input type="text" v-model="username" /></div>
    <button @click="signIn">SignIn</button>
</template>

<style scoped></style>
