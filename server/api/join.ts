import admin from '~/server/firebase-admin'
import { Game } from '~/server/model/game'
import { User } from '~/server/model/user'
import { DiscRole } from '~/server/model/disc_role'
import { Disc } from '~/server/model/disc'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const userID = event.context.userID
  if (!userID) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // check if user is in the game

  const userDoc = await db.collection('users').doc(userID).get()
  if (!userDoc.exists) {
    return createError({
      statusCode: 401,
      statusMessage: 'User not found'
    })
  }
  const user: User = userDoc.data() as User

  if (user.in_game) {
    return createError({
      statusCode: 401,
      statusMessage: 'User is in the game'
    })
  }

  const gameID = await searchForWaitingGame(userID)
  if (gameID) {
    return {
      game_id: gameID
    }
  }

  // 待機中のgameが存在しない場合は新規作成。
  console.log('Creating new game')
  const newGameID = await createRoom(userID)
  return {
    game_id: newGameID
  }
})

async function createRoom(userID: string): Promise<string | null> {
  const newBoard: Disc[] = []
  for (let i = 0; i < 64; i++) {
    newBoard.push(Disc.EMPTY)
  }
  newBoard[27] = Disc.BLACK
  newBoard[28] = Disc.WHITE
  newBoard[35] = Disc.WHITE
  newBoard[36] = Disc.BLACK
  newBoard[20] = Disc.EMPTY_POSSIBLE
  newBoard[29] = Disc.EMPTY_POSSIBLE
  newBoard[34] = Disc.EMPTY_POSSIBLE
  newBoard[43] = Disc.EMPTY_POSSIBLE

  return await db
    .collection('games')
    .add({
      turn: DiscRole.BLACK,
      end: false,
      board: newBoard,
      black_user: userID,
      white_user: '',
      users: [userID],
      black_num: 2,
      white_num: 2
    } as Game)
    .then((doc) => {
      return doc.id
    })
    .catch((err) => {
      console.log('Error creating game', err)
      return null
    })
}

// 既に待機中のゲームが存在する場合はそのゲームに参加し、GameIDを返す。
// 存在しない場合はnullを返す。
async function searchForWaitingGame(user: string): Promise<string | null> {
  const awaitingGame = await db
    .collection('games')
    .where('white_user', '==', '')
    .limit(1)
    .get()
  if (awaitingGame.empty) {
    return null
  }
  const gameRef = awaitingGame.docs[0].ref

  const result = await db
    .runTransaction(async (transaction) => {
      const gameDoc = await transaction.get(gameRef)
      if (!gameDoc.exists) {
        return null
      }
      const userDoc = await transaction.get(db.collection('users').doc(user))
      const game = gameDoc.data() as Game
      game.white_user = user
      game.users.push(user)
      transaction.update(gameRef, {
        white_user: user,
        users: [game.black_user, game.white_user]
      })
      transaction.update(db.collection('users').doc(user), {
        in_game: true,
        game_id: gameRef.id
      })
    })
    .then(() => gameRef.id)
    .catch((err) => {
      console.log('Transaction failure:', err)
      return null
    })
  if (!result) {
    console.log('Transaction failure: failed to join game')
    console.log('Trying again...')
    return await searchForWaitingGame(user)
  }
  return result
}
