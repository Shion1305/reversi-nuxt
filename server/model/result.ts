interface Result{
    id : string
    users : string[]
    black_user : string
    white_user : string
    black_num : Number
    white_num : Number
    winner : "black"|"white"|"draw"
    surrender : boolean
    time : Date
}