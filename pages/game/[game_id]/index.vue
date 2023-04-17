<script setup lang="ts">
import ReversiBoard from '~/components/ReversiBoard.vue'
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { GameData } from '~/types/game'

let gameData: GameData = ref({
  board: []
})
const boardData = computed(() => gameData.board)

//get game_id from url
const route = useRoute()
const gameID: string = route.params.game_id as string

// listen to GameData from firestore
console.log('gameID', gameID)
const db = getFirestore()
const gameRef = doc(db, 'games', gameID)
onSnapshot(gameRef, (doc) => {
  console.log('doc', doc)
  if (!doc.exists()) useRouter().push('/')
  gameData = doc.data() as GameData
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
