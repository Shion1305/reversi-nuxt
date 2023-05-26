import { PassRequest } from '~/server/api/game/pass.post'
import { getGameByID } from '~/server/pkg/game'
import admin from '~/server/firebase-admin'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const userID = event.context.userID
  if (!userID) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const req = await readBody(event)
    .then((body) => {
      return body as PassRequest
    })
    .catch(() => {
      return null
    })
  if (!req || !req.gameID) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  const game = await getGameByID(req.gameID)
  if (!game) {
    return createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  if (
    game.users[0] !== userID &&
    game.users.length === 2 &&
    game.users[1] !== userID
  ) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  if (game.end) {
    return createError({
      statusCode: 404,
      statusMessage: 'No Active Game Found, Game is over'
    })
  }

  await db.collection('games').doc(req.gameID).update({
    end: true,
    surrender: userID
  })
  return {
    statusCode: 200
  }
})
