import {ReversiBoard} from "./reversi";
import {Disc} from '~/server/model/disc'
import {ReversiResult} from '~/server/model/reversiresult'

let result;
it("基本動作",( ) => {
    let position = 26;
    let answer = Array(64).fill(Disc.EMPTY);
    answer[26] = answer[27]=answer[28]=answer[35]=Disc.BLACK;
    answer[36] = Disc.WHITE;
    answer[18]=answer[20]=answer[34]=Disc.EMPTY_POSSIBLE;
    let check = new ReversiBoard();
    result = check.placePiece(position, Disc.BLACK);
    expect(result).toEqual([false,Disc.WHITE,answer]);
    result = check.count();
    expect(result).toEqual([ReversiResult.BLACK,4,1])
});

it("基本動作(逆)",( ) => {
    let position = 26;
    let board = Array(64).fill(Disc.EMPTY);
    board[28] = board[35] = Disc.WHITE;
    board[27] = board[36] = Disc.BLACK;
    board[19] = board[26] = board[37] = board[44] = Disc.EMPTY_POSSIBLE;
    let answer = Array(64).fill(Disc.EMPTY);
    answer[26] = answer[27]=answer[28]=answer[35]=Disc.WHITE;
    answer[36] = Disc.BLACK;
    answer[18]=answer[20]=answer[34]=Disc.EMPTY_POSSIBLE;
    let check = new ReversiBoard(board);
    result = check.placePiece(position, Disc.WHITE);
    expect(result).toEqual([false,Disc.BLACK,answer]);
    result = check.count();
    expect(result).toEqual([ReversiResult.WHITE,1,4]);
});

it("パス",()=>{
    let position = 0;
    let board = Array(64).fill(Disc.EMPTY);
    board[1] = board[8] = Disc.WHITE;
    board[2] = Disc.BLACK;
    board [0] = Disc.EMPTY_POSSIBLE;
    let answer = Array(64).fill(Disc.EMPTY);
    answer[0] = answer[1] = answer[2] = Disc.BLACK;
    answer[8] = Disc.WHITE;
    answer[16] = Disc.EMPTY_POSSIBLE;
    let check = new ReversiBoard(board);
    result = check.placePiece(position, Disc.BLACK);
    expect(result).toEqual([false,Disc.BLACK,answer]);
    result = check.count();
    expect(result).toEqual([ReversiResult.BLACK,3,1]);
});

it("終了",()=>{
    let position = 0;
    let board = Array(64).fill(Disc.EMPTY);
    board[2] = board[16] = Disc.BLACK;
    board[1] = board[8] = Disc.WHITE;
    board[0] = Disc.EMPTY_POSSIBLE;
    let answer = Array(64).fill(Disc.EMPTY);
    answer[0] = answer[1] = answer[2] = answer[8]=answer[16]=Disc.BLACK;
    let check = new ReversiBoard(board);
    result = check.placePiece(position, Disc.BLACK);
    expect(result).toEqual([true,Disc.BLACK,answer]);
    result = check.count();
    expect(result).toEqual([ReversiResult.BLACK,5,0]);
});

it("置けないところ",()=>{
    let position = 0;
    let board = Array(64).fill(Disc.EMPTY);
    let answer = Array(64).fill(Disc.EMPTY);
    let check = new ReversiBoard(board);
    result = check.placePiece(position, Disc.BLACK);
    expect(result).toEqual(false);
});

it("斜め",()=>{
    let position = 27;
    let board = Array(64).fill(Disc.EMPTY);
    board[9] = Disc.BLACK;
    board[10] = board[17] = board[18]=Disc.WHITE;
    board[11] = board[25] = board[27] = Disc.EMPTY_POSSIBLE;
    let answer = Array(64).fill(Disc.EMPTY);
    answer[9] = answer[18] = answer[27] =Disc.BLACK;
    answer[10] = answer[17] = Disc.WHITE;
    answer[1] = answer[8] = answer[19] = answer[26] = Disc.EMPTY_POSSIBLE;
    let check = new ReversiBoard(board);
    result = check.placePiece(position, Disc.BLACK);
    expect(result).toEqual([false,Disc.WHITE,answer]);
    result = check.count();
    expect(result).toEqual([ReversiResult.BLACK,3,2]);
});




