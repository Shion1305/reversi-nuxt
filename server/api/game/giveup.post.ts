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

  const batch = db.batch()
  batch.update(db.collection('games').doc(req.gameID), {
    end: true,
    surrender: userID
  })

  const opponentUserID =
    game.users[0] === userID ? game.users[1] : game.users[0]

  const result = {
    black_user: game.black_user,
    white_user: game.white_user,
    black_num: game.black_num,
    white_num: game.white_num,
    winner: opponentUserID,
    users: game.users,
    time: new Date(),
    surrender: true
  } as Result
  batch.set(db.collection('results').doc(req.gameID), result)
  batch.update(db.collection('users').doc(userID), {
    in_game: false
  })
  batch.update(db.collection('users').doc(opponentUserID), {
    in_game: false
  })
  await batch.commit()
  return {
    statusCode: 200
  }
})
