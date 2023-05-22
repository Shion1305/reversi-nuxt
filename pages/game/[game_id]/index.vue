<script lang="ts" setup>
import ReversiBoard from '~/components/ReversiBoard.vue'
import {
  doc,
  DocumentReference,
  getFirestore,
  onSnapshot
} from 'firebase/firestore'
import { Game } from '~/model/game'
import axios from 'axios'

const data: { gameData: Game } = reactive({
  gameData: {
    board: []
  } as Game
})

//get game_id from url
const route = useRoute()
const gameID: string = route.params.game_id as string

// listen to Game from firestore
console.log('gameID', gameID)
const db = getFirestore()
const gameRef = doc(db, 'games', gameID) as DocumentReference<Game>
onSnapshot(gameRef, (doc) => {
  if (!doc.exists()) useRouter().push('/')
  data.gameData = doc.data() as Game
  data.gameData.id = doc.id
})
const logClick = function (row, col) {
  console.log(row, col)
}
const onPlace = function (row, col) {
  axios.post('/api/game/place', {
    gameID: gameID,
    index: row * 8 + col
  })
}

const passAction = function () {
  axios.post('/api/game/pass', {
    gameID: gameID
  })
}
</script>

<template>
  <div class="page-frame">
    <div id="result-pane">
      <div id="opponent-panel">aaaa</div>
      <ScoreBoard
        :black="data.gameData.black_num"
        :white="data.gameData.white_num"
      />
      <button @click="passAction">PASS</button>
    </div>
    <div id="board-pane">
      <div id="board-container">
        <ReversiBoard :board="data.gameData.board" @cell-click="onPlace" />
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
  background-image: url('@/assets/imgs/big_lotus.png');
  background-size: contain;

  > div {
    width: 70%;
  }
}

#board-pane {
  display: flex;
}

#result-pane {
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 0;
  width: 400px;
  height: 100%;
}
</style>
