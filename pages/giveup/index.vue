<script setup lang="ts">
const username: string = 'test'

const { signIn } = useLogin()
function onLoginClick() {
    if (username === '') return
    signIn(username)
}
</script>
<template>
    <div class="relative">
        <div class="caution">
            <img src="@/assets/imgs/caution.png" alt="caution">
        </div>
        <input type="text" class="caution_sentence" placeholder="本当に投了しますか？"/>
        <div class="btns">
            <div class="giveup">
                <img src="@/assets/imgs/onlyboard.png" alt="giveup">
                <p class="center"> 投了する </p>
            </div>
            <div class="not_giveup">
                <img src="@/assets/imgs/onlyboard.png" alt="not_giveup">
                <p class="center"> 投了しない </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.caution_sentence {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);

    width: 700px;
    padding: 8px 10px;
    border: none;
    border-radius: 3px;
    background-color: rgba(255,0,0,0.4);
    color: black;
    font-weight: bolder;
    font-size: 70px;
    line-height: 1.5;
}

.caution_sentence::placeholder {
    color: black;
}

.relative{
    position: relative;
}
.btns{
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;

}
.caution {
    text-align: center;
}
.caution img{
    width: 700px;
    height: 600px;
}
.giveup{
    position: relative;
}
.not_giveup{
    position: relative;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    font-weight: bold;
    color: black;
    padding: 0;
    margin: 0;
    white-space: nowrap;
}
</style>