<template lang="pug">
div.arrows-nav
  div.arrow-right(@click="setBlockIdx(1)")
    i.lnr.lnr-chevron-right
  div.arrow-left(@click="setBlockIdx(-1)")
    i.lnr.lnr-chevron-left
</template>
<script>
export default {
  computed: {
    currentBlockIdx() {
      return this.blocks.findIndex((block) => block.path === this.$route.path);
    },
    blocks() {
      return this.$store.state.blocks;
    },
  },
  methods: {
    setBlockIdx(val) {
      const sum = this.currentBlockIdx + val;
      const length = this.blocks.length;
      const idx = sum < 0 ? length - 1 : sum === length ? 0 : sum;

      this.switchBlock(idx);
    },
    switchBlock(idx) {
      const targetPath = this.blocks[idx].path;

      this.$router.push(targetPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.arrows-nav {
  position: absolute;
  padding: 10px 0;
  width: 60px;
  right: -80px;
  background-color: $color-onyx;
  border-radius: 35px;
  z-index: 98;
  list-style: none;
  bottom: 0;
  box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.15);
  .arrow-left,
  .arrow-right {
    display: block;
    position: relative;
    text-align: center;
    color: $color-grayX11-200;
    padding: 10px;
    font-size: 24px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: $color-greenMunsell;
    }
  }
  @include respond-to(sm) {
    background-color: rgba(0, 0, 0, 0.6);
    width: 48px;
    right: 10px;
    bottom: 10px;
    padding: 5px 0;
    border: 2px solid $color-greenMunsell;
    .arrow-left,
    .arrow-right {
      font-size: 24px;
    }
  }
}
</style>