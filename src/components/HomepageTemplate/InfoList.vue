<template lang="pug">
  div.info-list
    ul
      li(v-for="item in list" :key="item.title")
        span.title {{ item.title }}
        span.value {{ item.value }}
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.info-list {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }
  }
  .title {
    color: #0ba376;
    margin-right: 5px;
    font-weight: 600;
  }
  @include respond-to(ssm) {
    margin-top: 20px;
  }
}
</style>