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
import { DiscRole } from '~/model/disc_role'
import { useLogin } from '~/composables/useLogin'

const data: { gameData: Game } = reactive({
  gameData: {
    board: []
  } as Game
})

//get game_id from url
const route = useRoute()
const gameID: string = route.params.game_id as string

// listen to Game from firestore
const db = getFirestore()
const gameRef = doc(db, 'games', gameID) as DocumentReference<Game>

const statusText = ref('')
const blackUsername = ref('')
const whiteUsername = ref('')
let yourTurn = false
const currentUser = await useLogin().getCurrentUser()
const updateStatusText = async (): Promise<string> => {
  yourTurn = false
  let userDiscRole: DiscRole
  if (currentUser) {
    if (data.gameData.black_user === currentUser.userID) {
      userDiscRole = DiscRole.BLACK
    } else if (data.gameData.white_user === currentUser.userID) {
      userDiscRole = DiscRole.WHITE
    }
  }

  if (data.gameData.white_user === '') {
    return 'マッチング中...'
  }
  if (data.gameData.end) {
    if (data.gameData.surrender) {
      if (data.gameData.surrender === currentUser?.userID) {
        return 'あなたの投了で\n終了しました'
      }
      return '相手の投了で\n終了しました'
    }
    if (data.gameData.black_num > data.gameData.white_num) {
      if (userDiscRole === DiscRole.BLACK) {
        return 'あなたの勝ちです'
      } else {
        return 'あなたの負けです'
      }
    } else if (data.gameData.black_num < data.gameData.white_num) {
      if (userDiscRole === DiscRole.BLACK) {
        return 'あなたの負けです'
      } else {
        return 'あなたの勝ちです'
      }
    } else {
      return '引き分けです'
    }
  }
  if (data.gameData.turn === userDiscRole) {
    yourTurn = true
    return 'あなたの番です'
  }
  return '相手の番です'
}

const updateUsername = async () => {
  if (blackUsername.value !== '' && whiteUsername.value !== '') return
  const currentUser = await useLogin().getCurrentUser()
  if (currentUser) {
    if (data.gameData.black_user === currentUser.userID) {
      blackUsername.value = currentUser.username
      if (data.gameData.white_user !== '') {
        whiteUsername.value = await axios
          .get('/api/user/get-name?targetUser=' + data.gameData.white_user)
          .then((res) => {
            return res.data.name as string
          })
          .catch((error) => {
            console.log(error)
            return ''
          })
      }
    } else if (data.gameData.white_user === currentUser.userID) {
      whiteUsername.value = currentUser.username
      if (data.gameData.black_user !== '') {
        blackUsername.value = await axios
          .get('/api/user/get-name?targetUser=' + data.gameData.black_user)
          .then((res) => {
            return res.data.name as string
          })
          .catch((error) => {
            console.log(error)
            return ''
          })
      }
    }
  }
}

const modalState = ref(false)
const modalText = ref('')
const showModal = function (text: string) {
  modalText.value = text
  modalState.value = true
  setTimeout(async () => {
    modalState.value = false
  }, 1500)
}
const onPass = function () {
  axios.post('/api/game/pass', {
    gameID: gameID
  })
}

onSnapshot(gameRef, async (doc) => {
  if (!doc.exists()) useRouter().push('/')
  data.gameData = doc.data() as Game
  data.gameData.id = doc.id
  statusText.value = await updateStatusText()
  await updateUsername()
  if (data.gameData.possible_num === 0 && !data.gameData.end) {
    showModal('パス!!')
    await onPass()
  }
  if (data.gameData.end) {
    if (data.gameData.surrender) {
      if (data.gameData.surrender === currentUser?.username) {
        showModal('投了しました')
      } else {
        showModal('相手が投了しました')
      }
    } else {
      showModal('ゲーム終了')
    }
  }
})
const onPlace = function (row, col) {
  if (!yourTurn) return
  axios.post('/api/game/place', {
    gameID: gameID,
    index: row * 8 + col
  })
}

const onGiveup = function () {
  axios.post('/api/game/giveup', {
    gameID: gameID
  })
}
</script>

<template>
  <div class="page-frame">
    <div id="result-pane">
      <div id="status-panel">
        <img id="" src="@/assets/imgs/frog_with_board_green.png" />
        <div>{{ statusText }}</div>
      </div>
      <ScoreBoard
        :black="data.gameData.black_num"
        :black_user="blackUsername as string"
        :white="data.gameData.white_num"
        :white_user="whiteUsername as string"
      />
      <button class="action-button" @click="onGiveup">投了する</button>
      <button
        v-if="data.gameData.end"
        class="action-button"
        @click="useRouter().push('/')"
      >
        ホームに戻る
      </button>
      <button
        v-if="data.gameData.end"
        class="action-button"
        @click="useRouter().push('/record')"
      >
        戦績を確認する
      </button>
    </div>
    <div id="board-pane">
      <div id="board-container">
        <ReversiBoard :board="data.gameData.board" @cell-click="onPlace" />
      </div>
    </div>
    <div v-show="modalState" class="end-frame">
      <div class="popup">
        <img alt="" src="@/assets/imgs/frog_with_board_green.png" />
        <h1>{{ modalText }}</h1>
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

.action-button {
  width: calc(100% - 20px);
  height: 50px;
  font-size: 1.5em;
  background-color: #e2e2e2;
  border: none;
  border-radius: 10px;
  margin: 5px 10px;
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

#status-panel {
  position: relative;

  > img {
    width: 100%;
    height: auto;
  }

  > div {
    position: absolute;
    width: 80%;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    text-align: center;
    font-weight: bold;
  }
}

.end-frame {
  background: #303030aa;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup {
    position: relative;

    img {
      width: 500px;
      height: 500px;
    }

    h1 {
      position: absolute;
      top: 200px;
      left: 50px;
      width: 400px;
      text-align: center;
      font-size: 50px;
      color: #330000;
    }
  }
}
</style>
