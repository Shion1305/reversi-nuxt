import admin from '~/server/firebase-admin'
import { User } from '~/types/user'
import { Game } from '~/server/model/game'
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

  await db
    .collection('users')
    .doc(userID)
    .update({
      is_waiting: true
    })
    .catch((err) => {
      console.log('Error updating user', err)
      return createError({
        statusCode: 500,
        statusMessage: 'Error updating user'
      })
    })

  const q = await db
    .collection('users')
    .orderBy('is_waiting')
    .where('is_waiting', '==', true)
    .limit(1)
    .get()
  if (q.empty) {
    const game_id = createRoom(userID)
    await db.collection('users').doc(userID).update({
      game_id: game_id,
      is_waiting: true,
      in_game: true
    })
    return
  }
  const matchedUser = q.docs[0].data() as User
  await db.collection('users').doc(q.docs[0].id).update({
    is_waiting: false,
    in_game: true
  })
  await db.collection('users').doc(userID).update({
    is_waiting: false,
    in_game: true,
    game_id: matchedUser.game_id
  })
  return {
    game_id: matchedUser.game_id
  }
})

async function createRoom(userID: string): Promise<string> {
  let newBoard: Disc[] = []
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
      users: [userID]
    } as Game)
    .then((doc) => {
      return doc.id
    })
    .catch((err) => {
      console.log('Error creating game', err)
      return ''
    })
}
