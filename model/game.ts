import { Disc } from '~/model/disc'
import { DiscRole } from '~/model/disc_role'

export interface Game {
  id: string
  board: Disc[]
  turn: DiscRole
  users: string[]
  black_user: string
  white_user: string
  black_num: number
  white_num: number
  possible_num: number
  black_time: Date
  white_time: Date
  end: boolean
}
