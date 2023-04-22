<script setup lang="ts">
import ReversiBoard from '~/components/ReversiBoard.vue'
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  DocumentReference
} from 'firebase/firestore'
import { GameData } from '~/types/game'

const data: { gameData: GameData } = ref({
  gameData: { board: [] }
})
const boardData = computed(() => data.gameData.board ?? [])

//get game_id from url
const route = useRoute()
const gameID: string = route.params.game_id as string

// listen to GameData from firestore
console.log('gameID', gameID)
const db = getFirestore()
const gameRef = doc(db, 'games', gameID) as DocumentReference<GameData>
onSnapshot(gameRef, (doc) => {
  if (!doc.exists()) useRouter().push('/')
  data.gameData = doc.data() as GameData
  console.log('doc', data.gameData.board)
})
// setDoc(gameRef, {
//   board: [
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
  <ReversiBoard :board="boardData" @cell-click="logClick" />
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
