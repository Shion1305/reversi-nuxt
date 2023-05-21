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
            <table border="1" bgcolor="#90ee90" width="500" height="150">

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
        <div class="table2">
            <table border="1" bgcolor="#90ee90" width="625" height="150">

                <tr height="20">
                    <th>名前</th>
                    <th>勝ち</th>
                    <th>負け</th>
                    <th>引分</th>
                    <th>投了</th>
                </tr>

                <tr height="40">
                    <td>太郎</td>
                    <td>３２</td>
                    <td>　０</td>
                    <td>　０</td>
                    <td>　０</td>

                </tr>
                <tr height="40">
                    <td>次郎</td>
                    <td>３０</td>
                    <td>　２</td>
                    <td>　０</td>
                    <td>　０</td>
                </tr>
                <tr height="40">
                    <td>三郎</td>
                    <td>１０</td>
                    <td>２２</td>
                    <td>　０</td>
                    <td>　０</td>
                </tr>
                <tr height="40">
                    <td>四郎</td>
                    <td>２０</td>
                    <td>１２</td>
                    <td>　０</td>
                    <td>　０</td>
                </tr>
            </table>
        </div>
        <div class="m1">
        <p><font size="5">直近の戦績</font></p>
        </div>
        <div class="m2">
            <p><font size="5">相手毎の通算戦績</font></p>
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

    bottom: 50px;
    overflow-y: scroll;
    width: 517px;
    height: 150px;
}
.table2{
    position: absolute;
    left: 580px;
    bottom: 50px;
    overflow-y: scroll;
    width: 642px;
    height: 150px;
}
.table th{
    background: forestgreen;
    position: sticky;
    top: 0;
    left: 0;
}
.table2 th{
    background: forestgreen;
    position: sticky;
    top: 0;
    left: 0;
}
.m1{
    position: absolute;
    bottom: 180px;
}
.m2{
    position: absolute;
    right: 0;
    bottom: 180px;
}

</style>