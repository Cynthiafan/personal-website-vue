<template lang="pug">
  section.landing.flex.j-center.a-start.d-column
    div Hello, my name is
    h1.name Cynthia Fan,
    h2.doing a front-end developer.
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.name,
.doing {
  font-size: 70px;
  font-family: $font-serif;
  font-weight: bold;
  margin: 6px 0;
}
.doing {
  font-size: 50px;
  color: $color-gray;
}
</style>