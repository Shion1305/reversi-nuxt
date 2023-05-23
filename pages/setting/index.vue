<script setup lang="ts">
import axios from 'axios'

const user = await useLogin().getCurrentUser()
const nameRef = ref(user?.username)

const changeName = async () => {
  console.log('change name')
  console.log(nameRef.value)
  await axios
    .post('/api/user/change-name', {
      name: nameRef.value
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="base-frame">
    <div id="board-frame">
      <img src="@/assets/imgs/frog_with_board_green.png" alt="" class="frog" />
      <h1 class="absolute01">名前は？</h1>
    </div>
    <input class="absolute02" type="text" v-model="nameRef" />
    <input class="absolute03" type="submit" value="OK" @click="changeName" />
    <NuxtLink class="link" to="/">戻る</NuxtLink>
  </div>
</template>

<style scoped>
.base-frame {
  display: flex;
  flex-direction: column;
  align-items: center;

  .link {
    margin: 30px;
    padding: 5px;
    border-radius: 10px;
    text-decoration: none;
    color: black;
    font-size: 50px;
    background: white;
    border: 2px solid black;
  }
}

#board-frame {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .frog {
    width: 300px;
    height: 300px;
  }
  .absolute01 {
    position: absolute;
  }
}

/*.absolute01 {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  font-size: 50px;*/
/*  width: 350px;*/
/*  height: 100px;*/
/*}*/

.absolute02 {
  font-size: 40px;
  width: 350px;
  height: 100px;
}

.absolute03 {
  color: red;
  background-color: darkseagreen;
  font-size: 200%;
  width: 100px;
}
</style>
