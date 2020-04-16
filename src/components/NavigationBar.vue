<template lang="pug">
  nav.navigation
    div C
    div.links
      a(v-for="block in $store.state.blocks" 
        :key="block.id"
        :href="`#${block.id}`") {{ block.text }}
</template>
<script>
export default {};
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