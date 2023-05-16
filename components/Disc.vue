<script setup lang="ts">
import { Disc } from '~/model/disc'

const props = withDefaults(
  defineProps<{
    disc: number
  }>(),
  {
    disc: Disc.EMPTY
  }
)
</script>

<template>
  <div class="disc">
    <img
      v-if="props.disc === Disc.BLACK"
      src="@/assets/imgs/GreenFrog.png"
      alt="disc"
    />
    <img
      v-else-if="props.disc === Disc.WHITE"
      src="@/assets/imgs/PinkFrog.png"
      alt="disc"
    />
    <div v-else-if="props.disc === Disc.EMPTY_POSSIBLE" id="hint" />
  </div>
</template>
<style scoped>
.disc {
  box-sizing: border-box;
  margin: 5%;
  background-size: cover;
  aspect-ratio: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  > * {
    width: 100%;
    aspect-ratio: 1;
    position: absolute;
  }

  > img {
    object-fit: contain;
  }

  #hint {
    background: #fff;
    opacity: 0.4;
    width: 60%;
    border-radius: 50%;
  }
}
</style>
