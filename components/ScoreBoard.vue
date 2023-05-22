<script lang="ts" setup>
const props = defineProps<{ black: number; white: number }>()
</script>

<template>
  <div class="score-board">
    <div id="score-left">
      <div class="square">{{ props.black }}</div>
      <img alt="" class="frog-image" src="@/assets/imgs/GreenFrog.png" />
    </div>
    <p id="middle-bar">-</p>
    <div id="score-right">
      <div class="square">{{ props.white }}</div>
      <img alt="" class="frog-image" src="@/assets/imgs/PinkFrog.png" />
    </div>
  </div>
</template>

<style scoped>
.square {
  width: 100px;
  height: 100px;
  border: 1px solid;
  margin-left: 10%;
  margin-right: 10%;
  background-color: rgba(209, 209, 209, 0.5);
  text-align: center;
  font-size: 40px;
  line-height: 100px;
}

.score-board {
  display: flex;
  margin: 0 auto;
  flex-direction: row;

  #middle-bar {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 50px;
  }

  #score-left,
  #score-right {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .frog-image {
      margin: auto;
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }
}
</style>
