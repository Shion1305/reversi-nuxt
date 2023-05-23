<script setup lang="ts">

</script>

<template>
    <div>
        <p class="win">Draw</p>
        <div class="score">
            <div class="square"></div>
            <p>-</p>
            <div class="square"></div>
        </div>
        <div class="frog">
            <img src="../../../assets/imgs/GreenFrog.png" alt="" class="gf">
            <img src="../../../assets/imgs/PinkFrog.png" alt="" class="pf">
        </div>
        <div class="relative">
            <a>
                <img src="../../../assets/imgs/frog_with_board_green.png" alt="" class="board">
                <p class="absolute">タイトルに戻る</p>
            </a>
        </div>



    </div>



</template>

<style scoped>
div{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
}

.win{
    color:green;
    position: relative;
    right: 20%;
    font-size: 400%;
}

.score{
    position: relative;
    display: flex;
    flex-direction: row;
    left: 55%;
    width: 500px;
    height: 100px;
    font-size: 30px;
}

.square{
    width: 100px;
    height: 100px;
    border: 1px solid;
    margin-left: 10%;
    margin-right: 10%;
    background-color: rgba(209, 209, 209, 0.5);
}

.frog{
    position: relative;
    right: 210px;
    display: flex;
    flex-direction: row;
    margin-top: 3%;
}

.gf{
    width: 5%;
    height: 5%;
}

.pf{
    width: 5%;
    height: 5%;
    margin-left: 10%;
}

.relative{
    position: relative;
    top: 20px;
    right:15%;
}

.board{
    width: 20%;
    height: 20%;
}

.absolute {
    position: absolute;
    font-size: 200%;
    left:1185px;
    bottom: 40px;
}

</style>