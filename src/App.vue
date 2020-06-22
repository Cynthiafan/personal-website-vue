<template lang="pug">
  div#app
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
body {
  background-color: $color-body-bg;
  background: $color-body-gradient;
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  font-size: 15px;
  font-family: 'Poppins', Helvetica, sans-serif;
  line-height: 1.65em;
  overflow: hidden;
  color: #d5d5d5;
  background-repeat: no-repeat;
  background-position: center;
  background-position: 50% 50%;
  background-size: cover;
}
</style>
