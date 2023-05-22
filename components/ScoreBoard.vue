<script lang="ts" setup>
const props = defineProps<{ black: number; white: number }>()
</script>

<template>
  <div class="scoreboard">
    <div class="scoreboard">
      <div class="team1-score">{{ props.black }}</div>
      <div class="divider">-</div>
      <div class="team2-score">{{ props.white }}</div>
    </div>
  </div>
</template>

<style scoped>
.scoreboard {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.team1-score,
.divider,
.team2-score {
  margin: 0 10px;
}

.divider {
  color: #ff0000;
}
</style>
