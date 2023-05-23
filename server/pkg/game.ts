import { Game } from '~/server/model/game'
import admin from '~/server/firebase-admin'

const db = admin.firestore()

async function getGameByUserID(userID: string): Promise<Game | null> {
  const queryResult = await db
    .collection('games')
    .orderBy('users')
    .where('users', 'array-contains', userID)
    .get()

  if (queryResult.empty) {
    return null
  }
  return queryResult.docs[0].data() as Game
}

async function getGameByID(gameID: string): Promise<Game | null> {
  const queryResult = await db.collection('games').doc(gameID).get()
  if (!queryResult.exists) {
    return null
  }
  return queryResult.data() as Game
}

export { getGameByUserID, getGameByID }
