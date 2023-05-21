import { Disc } from '~/server/model/disc'
import { DiscRole } from '~/server/model/disc_role'
import { Game } from '~/server/model/game'

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

  public placeDisc(index: number): Game | null {
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
    const userDisc = DiscRole.getDisc(this.game.turn)
    newBoard[index] = userDisc
    const opponentDisc: Disc = DiscRole.getDisc(
      DiscRole.getOpponentDisc(this.game.turn)
    )

    let validMove = false

    const originX = index % 8
    const originY = Math.floor(index / 8)

    for (const direction of directions) {
      let currentX = originX + direction[0]
      let currentY = originY + direction[1]

      let flipped = false

      while (
        currentX >= 0 &&
        currentX < 8 &&
        currentY >= 0 &&
        currentY < 8 &&
        newBoard[currentX + currentY * 8] === opponentDisc
      ) {
        currentX += direction[0]
        currentY += direction[1]
        flipped = true
      }

      if (
        currentX >= 0 &&
        currentX < 8 &&
        currentY >= 0 &&
        currentY < 8 &&
        newBoard[currentX + currentY * 8] === userDisc &&
        flipped
      ) {
        validMove = true

        while (currentX !== originX || currentY !== originY) {
          currentX -= direction[0]
          currentY -= direction[1]
          newBoard[currentX + currentY * 8] = userDisc
        }
      }
    }

    if (!validMove) {
      return null
    }

    this.game.board = newBoard
    this.updatePossibleDiscs()
    this.game.turn = DiscRole.getOpponentDisc(this.game.turn)
    const discCount = this.countDiscs()
    this.game.black_num = discCount.black
    this.game.white_num = discCount.white
    this.game.possible_num = discCount.possible

    if (discCount.possible === 0) {
      if (!this.checkOpponentDiscPossible()) {
        this.game.end = true
      }
    }

    return this.game
  }

  private updatePossibleDiscs(): void {
    for (let i = 0; i < 64; i++) {
      if (this.game.board[i] === Disc.EMPTY_POSSIBLE) {
        this.game.board[i] = Disc.EMPTY
      }
    }

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

  public checkOpponentDiscPossible(): boolean {
    const currentDisc = DiscRole.getDisc(this.game.turn)
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
          this.game.board[currentX + currentY * 8] === currentDisc &&
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
          this.game.board[currentX + currentY * 8] === opponentDisc
        ) {
          return true
        }
      }
    }
    return false
  }

  public countDiscs(): { black: number; white: number; possible: number } {
    let black = 0
    let white = 0
    let possible = 0

    for (const disc of this.game.board) {
      if (disc === Disc.BLACK) {
        black++
      } else if (disc === Disc.WHITE) {
        white++
      } else if (disc === Disc.EMPTY_POSSIBLE) {
        possible++
      }
    }

    return { black, white, possible }
  }
}
