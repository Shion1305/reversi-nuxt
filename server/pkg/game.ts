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
    board: gameData.board,
    turn: gameData.turn,
    users: gameData.users,
    black_user: gameData.black_user,
    white_user: gameData.white_user,
    black_num: gameData.black_num,
    white_num: gameData.white_num,
    possible_num: gameData.possible_num,
    black_time: gameData.black_time,
    white_time: gameData.white_time,
    end: gameData.end,
    surrender: gameData.surrender
  }
}
