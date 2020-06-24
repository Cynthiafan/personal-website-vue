<template lang="pug">
  div.preloader
    div.preloader-animation
      div.preloader-spinner
</template>
<style lang="scss" scoped>
.preloader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: $color-eerieBlack;

  &-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    background-color: inherit;
    color: inherit;
    opacity: 1;
    transition: opacity 0.3s;
    transform: translate3d(-50%, -50%, 0);
  }

  &-spinner {
    width: 52px;
    height: 52px;
    margin: 100px auto;
    background-color: $color-greenMunsell;
    border-radius: 100%;
    animation: sk-scaleout 1s infinite ease-in-out;
  }
}

@keyframes sk-scaleout {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>