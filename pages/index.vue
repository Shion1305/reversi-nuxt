<script setup lang="ts">
const username: string = 'test'

const { signIn } = useLogin()

function onLoginClick() {
  if (username === '') return
  signIn(username)
}
</script>
<template>
  <a>
    <div class="relative">
      <img src="@/assets/imgs/frog_with_board_green.png" />
      <div class="loginbtn">
        <a href="">
          <img src="@/assets/imgs/btn_login_hover.png" class="absolute" />
        </a>
      </div>
    </div>
  </a>
</template>

<style scoped>
.relative {
  position: relative;
  text-align: center;
}

.loginbtn img {
  width: 300px;
}

.absolute {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
