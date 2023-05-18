import { Disc } from '~/server/model/disc'
import { DiscRole } from '~/server/model/disc_role'

export interface Game {
  id: string
  board: Disc[]
  turn: DiscRole
  users: string[]
  black_user: string
  white_user: string
  black_num: number
  white_num: number
  black_time: Date
  white_time: Date
  end: boolean
}
