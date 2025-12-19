import admin from '~/server/firebase-admin'
import { Game } from '~/server/model/game'

const db = admin.firestore()

export async function getGameByID(gameID: string): Promise<Game | null> {
  const gameDoc = await db.collection('games').doc(gameID).get()
  
  if (!gameDoc.exists) {
    return null
  }
  
  const gameData = gameDoc.data()
  if (!gameData) {
    return null
  }
  
  return {
    id: gameDoc.id,
    ...gameData
  } as Game
}
