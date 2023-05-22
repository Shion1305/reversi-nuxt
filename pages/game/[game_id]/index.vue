<script setup lang="ts">
import ReversiBoard from '~/components/ReversiBoard.vue'
import {
  getFirestore,
  doc,
  onSnapshot,
  DocumentReference
} from 'firebase/firestore'
import { GameData } from '~/types/game'

const data: { gameData: GameData } = reactive({
  gameData: {
    board: []
  } as GameData
})

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
const logClick = function (row, col) {
  console.log(row, col)
}
</script>

<template>
  <div class="page-frame">
    <div id="result-pane"></div>
    <div id="board-pane">
      <div id="board-container">
        <ReversiBoard :board="data.gameData.board" @cell-click="logClick" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-frame {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
  align-items: center;
}

#board-pane {
  height: 100%;
}

#board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(100lvw - 400px, 100lvh - 120px);
  aspect-ratio: 1;
  padding: 5%;
  box-sizing: border-box;
  margin: auto;
}

#board-pane {
  display: flex;
}

#result-pane {
  right: 0;
  width: 400px;
  height: 100%;
}
</style>