import {Disc} from '~/server/model/disc'
export interface Game {
    id : string
    board : Disc[]
    turn : "black"|"white"
    black_user : string
    white_user : string
    black_num : Number
    white_num : Number
    black_time : Date
    white_time : Date
    end : boolean
}