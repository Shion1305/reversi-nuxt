<script setup lang="ts">

</script>

<template>
    <div class="wrapper">
        <div class="result">
        <div class="g1">
            <img src="@/assets/imgs/leaf.png" width="700" height="300"/>
        </div>
        <div class="g2">
            <p><font size="5">通算戦績</font></p>
            <p><font size="30">勝ち:64 負け:16</font></p>
            <p><font size="30">引き分け:0 投了:0</font></p>
        </div>
        </div>
        <div class="table">
            <table border="1" bgcolor="#90ee90" width="750" height="150">
                <tr>
                    <th>名前</th>
                    <th>勝敗</th>
                    <th>自分</th>
                    <th>相手</th>
                </tr>
                <tr>
                    <th>太郎</th>
                    <th>勝ち</th>
                    <th>６０</th>
                    <th>　４</th>
                </tr>
                <tr>
                    <th>太郎</th>
                    <th>負け</th>
                    <th>　４</th>
                    <th>６０</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}

.g1 {
    position: relative;
}
.g2  {
    position: absolute;
}
.result{
    display: flex;
    justify-content: center;
}
.table{
    display: flex;
    justify-content: center;
}
</style>