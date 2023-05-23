<script setup lang="ts"></script>

<template>
  <div class="relative">
    <img src="@/assets/imgs/frog_with_board_green.png" alt="" class="frog" />
    <h1 class="absolute01">名前は？</h1>
    <img src="@/assets/imgs/otamajakusi.png" alt="" />
    <input class="absolute02" type="text" />
    <input class="absolute03" type="submit" value="OK" />
  </div>
</template>

<style scoped>
.relative {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
}

.frog {
  width: 300px;
  height: 300px;
}

.absolute01 {
  position: absolute;
  text-align: center;
  font-size: 50px;
  top: 110px;
}

.absolute02 {
  position: absolute;
  font-size: 300%;
  top: 400px;
  right: 700px;
  width: 350px;
  height: 100px;
}

.absolute03 {
  position: absolute;
  color: red;
  background-color: darkseagreen;
  font-size: 200%;
  top: 430px;
  left: 900px;
  width: 100px;
}
</style>