<script lang="ts" setup>

const props = withDefaults(defineProps<{ boardData: number[][] }>(),
  {
    boardData: () => [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  })
</script>

<template>
  <div class="board">
    <div v-for="row in props.boardData" class="board-row">
      <div v-for="s in row" class="board-cell">
        <div class="cell" :class="s === 0 ? 'empty' : s === 1 ? 'black' : 'white'"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    width: 400px;
    height: 400px;
    border: 2px solid #000;
    background-color: #228b22;
}

.board-row {
    display: contents;
}

.board-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
}

.cell {
    width: 80%;
    height: 80%;
    border-radius: 50%;

    &.empty {
        background-color: transparent;
    }

    &.black {
        background-color: #000;
    }

    &.white {
        background-color: #fff;
    }
}
</style>
