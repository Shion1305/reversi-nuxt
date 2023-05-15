import { Disc } from '~/server/model/disc'

export class ReversiBoard {
  private board: Disc[]

  constructor(inputBoard: Disc[]) {
    this.board = [...inputBoard]
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === Disc.EMPTY_POSSIBLE) {
        this.board[i] = Disc.EMPTY
      }
    }
  }

  public placeDisc(index: number, disc: Disc): Disc[] | null {
    if (
      this.board[index] !== Disc.EMPTY &&
      this.board[index] !== Disc.EMPTY_POSSIBLE
    ) {
      return null
    }

    const newBoard = [...this.board]
    newBoard[index] = disc
    const opponentDisc: Disc = disc === Disc.BLACK ? Disc.WHITE : Disc.BLACK

    const directions = [-1, -1 + 8, 8, 1 + 8, 1, 1 - 8, -8, -1 - 8]

    let validMove = false

    let flipped: boolean = false

    for (const direction of directions) {
      let currentIndex = index + direction
      let flipped = false

      while (newBoard[currentIndex] === opponentDisc) {
        currentIndex += direction
        flipped = true
      }

      if (flipped && newBoard[currentIndex] === disc) {
        validMove = true

        currentIndex -= direction
        while (currentIndex !== index) {
          newBoard[currentIndex] = disc
          currentIndex -= direction
        }
      }
    }

    return validMove ? newBoard : null
  }

  public exportBoard(): Disc[] {
    return [...this.board]
  }

  // private getDis
}
