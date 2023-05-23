<script lang="ts" setup>
import axios from 'axios'

const joinGame = async () => {
  console.log('join game')
  const gameID = await axios
    .post('/api/join')
    .then((res) => {
      return res.data.game_id
    })
    .catch((error) => {
      console.log(error)
    })
  if (!gameID) return
  await useRouter().push(`/game/${gameID}`)
}

const goRecord = () => {
  useRouter().push('/record')
}
</script>

<template>
  <div class="base-wrapper">
    <div class="wrapper">
      <button @click="joinGame">
        <img src="@/assets/imgs/taikyoku.png" width="500" />
      </button>

      <button @click="goRecord">
        <img src="@/assets/imgs/senseki.png" width="500" />
      </button>
    </div>
    <button @click="useRouter().push('/setting')">名前の変更</button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
}

.base-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > button {
    width: 500px;
    height: 200px;
    font-size: 50px;
  }
}
</style>
