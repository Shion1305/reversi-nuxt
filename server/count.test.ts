import {ReversiBoard} from "./reversi";
import {Disc} from '~/server/model/disc'
import {ReversiResult} from '~/server/model/reversiresult'

let board : Disc[];
let black = 0, white = 0;
let check : ReversiBoard;
let mode : ReversiResult;
for(let r = 0; r < 10000;r++) {
    black = 0;
    white = 0;
    board = Array(64).fill(Disc.EMPTY);
    for (let i = 0; i < 64; i++) {
        let tmp = Math.random() * 4;
        if (tmp < 1) {
            board[i] = Disc.EMPTY;
        } else if (tmp < 2) {
            black++;
            board[i] = Disc.BLACK;
        } else if (tmp < 3) {
            white++;
            board[i] = Disc.WHITE;
        } else {
            board[i] = Disc.EMPTY_POSSIBLE;
        }
    }
    check = new ReversiBoard(board);
    if(black > white){
        mode = ReversiResult.BLACK;
    }else if(black < white){
        mode = ReversiResult.WHITE;
    }else {
        mode = ReversiResult.DRAW;
    }
    it("test", () => {
        let result = check.count();
        expect(result).toEqual([mode, black, white]);
    });
}