<template lang="pug">
  div.certificate-item
    div(v-for="item in list" :key="item.title")
      div.certi-logo 
        img(v-if="item.logo" :alt="item.logoAlt")
        span(v-else) {{ item.logoAlt }}
      
      div.certi-content
        div.certi-title
          h4 {{ $_handleI18n(item, page, 'title') }}
        div.certi-id
          span {{ item.id }}
        div.certi-date
          span {{ item.year }}
        //- div.certi-company
          span
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
.certificate-item {
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  border: 2px solid $color-onyx;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  .certi-logo {
    display: table-cell;
    width: 120px;
    height: 100%;
    background-color: $color-onyx;
    padding: 25px;
    vertical-align: middle;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    img {
      display: block;
      max-width: 100%;
    }
  }
  .certi-content {
    display: table-cell;
    width: 100%;
    padding: 20px 25px;
    vertical-align: middle;
    .certi-title h4 {
      font-size: 16px;
      margin: 0 0 5px;
    }

    .certi-id {
      font-size: 0.9em;
      color: $color-sonicSilver;
    }

    .certi-date {
      font-size: 0.7em;
      color: $color-sonicSilver;
      opacity: 0.7;
    }
  }
}
</style>