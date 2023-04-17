<script setup lang="ts">
const username: string = 'test'

const { signIn } = useLogin()
function onLoginClick() {
  if (username === '') return
  signIn(username)
}
</script>
<template>
  <div>Welcome!!</div>
  <h1>Login</h1>
  <div><span>Username: </span><input type="text" v-model="username" /></div>
  <button @click="signIn">SignIn</button>
</template>

<style scoped></style>
