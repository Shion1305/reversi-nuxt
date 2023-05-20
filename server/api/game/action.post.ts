import { getGameByID } from '~/server/pkg/game'
import { ReversiBoard } from '~/server/model/reversiBoard'
import { DiscRole } from '~/server/model/disc_role'

export interface ActionRequest {
  gameID: string
  index: number
}

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
      return JSON.parse(body) as ActionRequest
    })
    .catch(() => {
      return null
    })
  if (!req || !req.gameID || !req.index) {
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

  if (game.users.indexOf(userID) === -1) {
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

  const nextUserTurn =
    game.turn === DiscRole.BLACK ? game.black_user : game.white_user
  if (nextUserTurn !== userID) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden, not your turn...'
    })
  }

  const board = new ReversiBoard(game.board)
  const newBoard = board.placeDisc(req.index, game.turn)
  if (!newBoard) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  game.board = newBoard
  game.turn = game.turn === DiscRole.BLACK ? DiscRole.WHITE : DiscRole.BLACK

  return {
    statusCode: 200
  }
})
