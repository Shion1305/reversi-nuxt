type Cell = 0 | 1 | 2| 3;

class Reversi {
    private board: Cell[];

    constructor(initialState?: Cell[]) {
        if (initialState && initialState.length === 64) {
            this.board = initialState;
        } else {
            this.board = Array(64).fill(0);
            this.board[27] = this.board[36] = 2;
            this.board[28] = this.board[35] = 1;
            this.board[19] = this.board[26] = this.board[37] = this.board[44] = 3;
        }
    }

    private isValidIndex(index: number): boolean {
        return index >= 0 && index < 64;
    }

    private getOpponent(player: Cell): Cell {
        return player === 1 ? 2 : 1;
    }

    private checkDirection(index: number, player: Cell, dx: number, dy: number): boolean {
        let x = index % 8 + dx;
        let y = Math.floor(index / 8) + dy;

        if (x < 0 || x > 7 || y < 0 || y > 7) {
            return false;
        }

        let newIndex = y * 8 + x;
        let opponent = this.getOpponent(player);

        if (this.board[newIndex] !== opponent) {
            return false;
        }

        while (this.isValidIndex(newIndex) && this.board[newIndex] === opponent) {
            x += dx;
            y += dy;

            if (x < 0 || x > 7 || y < 0 || y > 7) {
                return false;
            }

            newIndex = y * 8 + x;
        }

        return this.isValidIndex(newIndex) && this.board[newIndex] === player;
    }

    private checkAllDirections(index: number, player: Cell): boolean {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        return directions.some(([dx, dy]) => this.checkDirection(index, player, dx, dy));
    }

    placePiece(index: number, player: Cell): [boolean,Number,Number[]] {
        this.board[index] = player;
        let opponent = this.getOpponent(player);
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        let flag = 0;

        directions.forEach(([dx, dy]) => {
            if (this.checkDirection(index, player, dx, dy)) {
                let x = index % 8 + dx;
                let y = Math.floor(index / 8) + dy;
                let newIndex = y * 8 + x;
                while (this.isValidIndex(newIndex) && this.board[newIndex] === opponent) {
                    this.board[newIndex] = player;
                    x += dx;
                    y += dy;
                    newIndex = y * 8 + x;
                }
            }
        });
        this.board.forEach((x,i) => {
            if(x === 0||3) {
                if(this.checkAllDirections(i,opponent)){
                    this.board[i] = 3;
                    flag = 1;
                }
            }
        });
        if(flag === 0){
            this.board.forEach((x,i) => {
                if(x === 0||3) {
                    if(this.checkAllDirections(i,player)){
                        this.board[i] = 3;
                        flag = 1;
                    }
                }
            });
        }else{
            return  [false,<Number>opponent,<Number[]>this.board];
        }
        if(flag === 0){
            return  [true,<Number>player,<Number[]>this.board];
        }else{
            return  [false,<Number>player,<Number[]>this.board];
        }
    }

    count():[number,number,number]{
        let black= 0;
        let white = 0;
        this.board.forEach((x)=>{
            if(x === 1){
                black++;
            }else if(x === 2) {
                white++;
            }
        });
        if(black > white){
            return [0,black,white];
        }else if(black < white){
            return [1,black,white];
        }else{
            return [2,black,white];
        }
    }
}