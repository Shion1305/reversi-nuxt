import { User } from '~/types/user'

export interface GameData {
  id: number
  board: number[]
  players: User[]
  turn: number
}
