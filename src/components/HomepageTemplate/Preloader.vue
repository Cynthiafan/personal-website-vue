<template lang="pug">
  div.preloader
    div.preloader-animation
      div.preloader-spinner
</template>
<style lang="scss" scoped>
/* ============================================================================= 
3. Page loadig animation
============================================================================= */
.no-js .preloader,
.no-js .preloader-portfolio {
  display: none;
}
.preloader,
.preloader-portfolio {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #222;
}

.preloader-animation {
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

.preloader-spinner {
  width: 52px;
  height: 52px;
  margin: 100px auto;
  background-color: #0ba376;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>