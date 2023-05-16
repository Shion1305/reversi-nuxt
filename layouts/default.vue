<script lang="ts" setup></script>

<template>
  <div id="base-background">
    <div id="base-view-frame">
      <Header />
      <main>
        <slot />
      </main>
    </div>
    <img id="background-pond" src="@/assets/imgs/pond.png" />
  </div>
</template>

<style scoped lang="scss">
#base-background {
  width: 100lvw;
  height: 100lvh;
  overflow: hidden;
  position: relative;
}

#base-view-frame {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#background-pond {
  object-fit: cover;
  z-index: -10;
  top: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
<style>
body {
  margin: 0;
}
</style>
