<template lang="pug">
  nav.navigation
    div C
    div.links
      a(v-for="block in $store.state.blocks" 
        :key="block.id"
        :href="`${block.path}`"
        :target="block.isStatic ? '_blank': '_self'"
        @click.prevent="scrollToSection") {{ block.text }}
</template>
<script>
export default {
  methods: {
    scrollToSection(e) {
      const sectionId = e.target.hash;

      if (sectionId) {
        const targetSection = document.querySelector(sectionId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        const url = e.target.href;
        window.open(url, '_blank');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $color-navigationText;
  padding: 20px 40px;
}
.links a {
  font-family: $font-mono;
  margin: 0 16px;
  font-size: 12px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    color: $color-navigationTextHover;
  }
}
</style>