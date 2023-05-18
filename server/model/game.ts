import { Disc } from '~/server/model/disc'

export interface Game {
  id: string
  board: Disc[]
  turn: 'black' | 'white'
  users: string[]
  black_user: string
  white_user: string
  black_num: Number
  white_num: Number
  black_time: Date
  white_time: Date
  end: boolean
}
