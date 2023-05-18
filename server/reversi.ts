import {Disc} from '~/server/model/disc'
import {ReversiResult} from "~/server/model/reversiresult";

export class ReversiBoard {
  private board: Disc[]

  constructor(initialState?: Disc[]) {
    if (initialState && initialState.length === 64) {
      this.board = initialState
    } else {
      this.board = Array(64).fill(Disc.EMPTY)
      this.board[27] = this.board[36] = Disc.WHITE
      this.board[28] = this.board[35] = Disc.BLACK
      this.board[19] = this.board[26] = this.board[37] = this.board[44] = Disc.EMPTY_POSSIBLE
    }
  }

  private isValidIndex(index: number): boolean {
    return index >= 0 && index < 64
  }

  private getOpponent(player: Disc): Disc {
    return player === Disc.WHITE ? Disc.BLACK : Disc.WHITE
  }

  private checkDirection(
    index: number,
    player: Disc,
    dx: number,
    dy: number
  ): boolean {
    let x = (index % 8) + dx
    let y = Math.floor(index / 8) + dy

    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false
    }

    let newIndex = y * 8 + x
    let opponent = this.getOpponent(player)

    if (this.board[newIndex] !== opponent) {
      return false
    }

    while (this.isValidIndex(newIndex) && this.board[newIndex] === opponent) {
      x += dx
      y += dy

      if (x < 0 || x > 7 || y < 0 || y > 7) {
        return false
      }

      newIndex = y * 8 + x
    }

    return this.isValidIndex(newIndex) && this.board[newIndex] === player
  }

  private checkAllDirections(index: number, player: Disc): boolean {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]

    return directions.some(([dx, dy]) =>
      this.checkDirection(index, player, dx, dy)
    )
  }

  placePiece(index: number, player: Disc): [boolean, Disc, Disc[]]|boolean {
      if(this.board[index] !== Disc.EMPTY_POSSIBLE){
          return false
      }
    this.board[index] = player
    let opponent = this.getOpponent(player)
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]
    let flag = 0

    directions.forEach(([dx, dy]) => {
      if (this.checkDirection(index, player, dx, dy)) {
        let x = (index % 8) + dx
        let y = Math.floor(index / 8) + dy
        let newIndex = y * 8 + x
        while (
          this.isValidIndex(newIndex) &&
          this.board[newIndex] === opponent
        ) {
          this.board[newIndex] = player
          x += dx
          y += dy
          newIndex = y * 8 + x
        }
      }
    })
      this.board.forEach((x, i) => {
          if (x === Disc.EMPTY_POSSIBLE) {
              this.board[i] = Disc.EMPTY
          }
      })
    this.board.forEach((x, i) => {
      if (x === Disc.EMPTY || Disc.EMPTY_POSSIBLE) {
        if (this.checkAllDirections(i, opponent)) {
          this.board[i] = Disc.EMPTY_POSSIBLE
          flag = 1
        }
      }
    })
    if (flag === 0) {
      this.board.forEach((x, i) => {
        if (x === Disc.EMPTY || Disc.EMPTY_POSSIBLE) {
          if (this.checkAllDirections(i, player)) {
            this.board[i] = Disc.EMPTY_POSSIBLE
            flag = 1
          }
        }
      })
    } else {
      return [false, opponent, this.board]
    }
    if (flag === 0) {
      return [true, player, this.board]
    } else {
      return [false, player, this.board]
    }
  }

    count():[ReversiResult,number,number]{
        let black= 0;
        let white = 0;
        this.board.forEach((x)=>{
            if(x === Disc.BLACK){
                black++;
            }else if(x === Disc.WHITE) {
                white++;
            }
        });
        if(black > white){
            return [ReversiResult.BLACK,black,white];
        }else if(black < white){
            return [ReversiResult.WHITE,black,white];
        }else{
            return [ReversiResult.DRAW,black,white];
        }
    }
}