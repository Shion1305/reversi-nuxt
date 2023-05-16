<script lang="ts" setup></script>

<template>
  <header>
    <img
      alt="ひっくりかえる ヘッダー画像"
      src="@/assets/imgs/header-logo.png"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 120px;
  display: flex;

  img {
    box-sizing: border-box;
    margin: auto;
    padding: 10px;
    height: 100%;
    max-width: 100vw;
    object-fit: contain;
  }
}
</style>
