<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    black: number
    white: number
    black_user: string
    white_user: string
  }>(),
  {
    black: 0,
    white: 0,
    black_user: '',
    white_user: ''
  }
)
</script>

<template>
  <div class="score-board">
    <div id="score-left">
      <div class="name-area">{{ props.black_user }}</div>
      <div class="square">{{ props.black }}</div>
      <img alt="" class="frog-image" src="@/assets/imgs/black_frog.png" />
    </div>
    <p id="middle-bar">-</p>
    <div id="score-right">
      <div class="name-area">{{ props.white_user }}</div>
      <div class="square">{{ props.white }}</div>
      <img alt="" class="frog-image" src="@/assets/imgs/white_frog.png" />
    </div>
  </div>
</template>

<style scoped>
.name-area {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60px;
  width: 100px;
  text-align: center;
  line-height: 1.4;
  font-size: 18px;
  font-weight: bold;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  //display: -webkit-box;
  //-webkit-box-orient: vertical;
  //-webkit-line-clamp: 3;
}

.square {
  width: 100px;
  height: 80px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 20px;
  text-align: center;
  font-size: 65px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

#score-left {
  .square,
  .name-area {
    background: #303030;
    color: white;
  }
}

#score-right {
  .square,
  .name-area {
    background: white;
    color: #303030;
  }
}

.score-board {
  display: flex;
  margin: 0 auto;
  flex-direction: row;

  #middle-bar {
    width: 100px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 70px;
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
