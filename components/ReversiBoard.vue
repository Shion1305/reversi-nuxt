<script lang="ts" setup>
const props = withDefaults(defineProps<{ board: number[] }>(), {
  board: () => [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
})
const boardRows = computed(() => {
  const size = 8
  const result = []
  for (let i = 0; i < props.board.length; i += size) {
    result.push(props.board.slice(i, i + size))
  }
  return result
})

const emits =
  defineEmits<(e: 'cell-click', index1: number, index2: number) => void>()
</script>

<template>
  <div class="board">
    <div v-for="(row, index1) in boardRows" :key="row.index" class="board-row">
      <div v-for="(s, index2) in row" class="board-cell">
        <Disc :disc="s" @click="emits('cell-click', index1, index2)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.board {
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  border: 2px solid #000;
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
  padding: 3%;
  box-sizing: border-box;

  > .disc {
    width: 100%;
    height: 100%;
  }
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
