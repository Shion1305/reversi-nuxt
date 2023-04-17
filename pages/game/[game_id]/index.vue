<script setup>
import ReversiBoard from '~/components/ReversiBoard.vue'
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore'

const boardData = ref([])

//get game_id from url
const route = useRoute()
const gameID = route.params.game_id

// listen to GameData from firestore
console.log('gameID', gameID)
const db = getFirestore()
const gameRef = doc(db, 'games', gameID)
onSnapshot(gameRef, (doc) => {
  boardData.value = doc.data().boardData
})
// setDoc(gameRef, {
//   boardData: [
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
//   ]
// })
const logClick = function (row, col) {
  console.log(row, col)
}
</script>

<template>
  <ReversiBoard :boardData="boardData" @cell-click="logClick" />
</template>

<style lang="scss" scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}
</style>
