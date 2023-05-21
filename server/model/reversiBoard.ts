import { Disc } from '~/server/model/disc'
import { DiscRole } from '~/server/model/disc_role'
import { Game } from '~/server/model/game'

export class ReversiBoard {
  private readonly game: Game

  constructor(game: Game) {
    this.game = Object.create(game)
    for (let i = 0; i < 64; i++) {
      if (this.game.board[i] === Disc.EMPTY_POSSIBLE) {
        this.game.board[i] = Disc.EMPTY
      }
    }
  }

  public placeDisc(index: number, discRole: DiscRole): Game | null {
    if (this.game.end) {
      return null
    }
    if (
      this.game.board[index] !== Disc.EMPTY &&
      this.game.board[index] !== Disc.EMPTY_POSSIBLE
    ) {
      return null
    }

    const newBoard = [...this.game.board]
    const userDisc = DiscRole.getDisc(discRole)
    newBoard[index] = userDisc
    const opponentDisc: Disc =
      discRole === DiscRole.BLACK ? Disc.WHITE : Disc.BLACK

    const directions = [-1, -1 + 8, 8, 1 + 8, 1, 1 - 8, -8, -1 - 8]

    let validMove = false

    for (const direction of directions) {
      let currentIndex = index + direction
      let flipped = false

      while (newBoard[currentIndex] === opponentDisc) {
        currentIndex += direction
        flipped = true
      }

      if (flipped && newBoard[currentIndex] === userDisc) {
        validMove = true

        currentIndex -= direction
        while (currentIndex !== index) {
          newBoard[currentIndex] = userDisc
          currentIndex -= direction
        }
      }
    }

    if (!validMove) {
      return null
    }

    this.game.board = newBoard
    this.updatePossibleDiscs()
    this.game.turn = DiscRole.getOpponentDisc(discRole)
    const discCount = this.countDiscs()
    this.game.black_num = discCount.black
    this.game.white_num = discCount.white

    return this.game
  }

  private updatePossibleDiscs(): void {
    for (let i = 0; i < 64; i++) {
      if (this.game.board[i] === Disc.EMPTY_POSSIBLE) {
        this.game.board[i] = Disc.EMPTY
      }
    }

    const directions: number[][] = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1]
    ]
    const opponentDisc = DiscRole.getDisc(
      DiscRole.getOpponentDisc(this.game.turn)
    )

    for (let i = 0; i < 64; i++) {
      if (this.game.board[i] !== Disc.EMPTY) {
        continue
      }

      const originX = i % 8
      const originY = Math.floor(i / 8)

      for (const direction of directions) {
        let currentX = originX + direction[0]
        let currentY = originY + direction[1]
        let flipped = false

        while (
          this.game.board[currentX + currentY * 8] === opponentDisc &&
          currentX >= 0 &&
          currentX < 8 &&
          currentY >= 0 &&
          currentY < 8
        ) {
          currentX += direction[0]
          currentY += direction[1]
          flipped = true
        }

        if (
          flipped &&
          this.game.board[currentX + currentY * 8] ===
            DiscRole.getDisc(this.game.turn)
        ) {
          this.game.board[i] = Disc.EMPTY_POSSIBLE
        }
      }
    }
  }

  public countDiscs(): { black: number; white: number } {
    let black = 0
    let white = 0

    for (const disc of this.game.board) {
      if (disc === Disc.BLACK) {
        black++
      } else if (disc === Disc.WHITE) {
        white++
      }
    }

    return { black, white }
  }
}
