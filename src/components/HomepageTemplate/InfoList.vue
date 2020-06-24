<template lang="pug">
  ul.info-list
    li(v-for="item in list" :key="item.title")
      span.title {{ item.title }}
      span.value {{ $_handleI18n(item, page, 'value') }}
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    page: String,
  },
};
</script>
<style lang="scss" scoped>
ul.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .title {
    color: $color-greenMunsell;
    margin-right: 5px;
    font-weight: 600;
  }
  @include respond-to(ssm) {
    margin-top: 20px;
  }
}
</style>