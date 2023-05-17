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

                <tr height="20">
                    <th>名前</th>
                    <th>勝敗</th>
                    <th>自分</th>
                    <th>相手</th>
                </tr>

                <tr height="40">
                    <td>太郎</td>
                    <td>勝ち</td>
                    <td>６０</td>
                    <td>　４</td>
                </tr>
                <tr height="40">
                    <td>太郎</td>
                    <td>負け</td>
                    <td>　４</td>
                    <td>６０</td>
                </tr>
                <tr height="40">
                    <td>太郎</td>
                    <td>勝ち</td>
                    <td>６０</td>
                    <td>　４</td>
                </tr>
                <tr height="40">
                    <td>太郎</td>
                    <td>勝ち</td>
                    <td>６０</td>
                    <td>　４</td>
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
    position: absolute;
    left: 250px;
    bottom: 50px;
    overflow-y: scroll;
    width: 767px;
    height: 150px;
}
.table th{
    background: forestgreen;
    position: sticky;
    top: 0;
    left: 0;
}

</style>