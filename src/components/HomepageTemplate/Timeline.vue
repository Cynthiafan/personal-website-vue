<template lang="pug">
  div.timeline.clearfix

    div.timeline-item.clearfix(v-for="item in list" :key="item.company")
      div.left-part
        h5.item-period {{ item.period.start }} - {{ item.period.end }}
        a(:href="item.url" target="_blank")
          span.item-company {{ $_handleI18n(item, page, 'company') }}
      div.divider
      div.right-part
        h4.item-title {{ $_handleI18n(item, page, 'title') }}
        ul.item-description
          li(v-for="sentence in $_handleI18n(item, page, 'description')" :key="sentence") {{ sentence }}
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
.timeline {
  .timeline-item {
    position: relative;
    display: table;
    table-layout: fixed;
    width: 100%;
    padding-bottom: 15px;
    &:last-child,
    .right-part {
      padding-bottom: 0;
    }
    @include respond-to(ss) {
      position: relative;
      display: block;
    }
  }
  .left-part {
    width: 30%;
    display: table-cell;
    padding-right: 25px;
    min-height: 100%;
    text-align: right;
    vertical-align: top;
    @include respond-to(ss) {
      width: 100%;
      display: block;
      padding-left: 25px;
      min-height: 100%;
      text-align: left;
    }
  }
  .right-part {
    width: 70%;
    display: table-cell;
    padding-left: 25px;
    padding-right: 15px;
    vertical-align: top;
    p,
    p > * {
      font-size: 0.92em;
    }
    @include respond-to(ss) {
      width: 100%;
      display: block;
      padding-left: 25px;
      padding-right: 0;
    }
  }
  .divider {
    position: absolute;
    top: 0;
    left: 30%;
    bottom: 0;
    width: 1px;
    background-color: $color-onyx;
    @include respond-to(ss) {
      left: 0;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      margin-top: 4px;
      width: 17px;
      height: 17px;
      position: absolute;
      margin-left: -8px;
      border-radius: 10px;
      background-color: $color-greenMunsell;
      opacity: 0.25;
      z-index: 0;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      margin-top: 8px;
      width: 9px;
      height: 9px;
      margin-left: -4px;
      background-color: $color-eerieBlack;
      border-radius: 5px;
      border: 2px solid $color-greenMunsell;
      z-index: 1;
    }
  }
  .item-title {
    font-size: 16px;
    margin-bottom: 3px;
    margin-top: 3px;
  }
  .item-description {
    list-style: disc;
    padding-left: 22px;
    padding-bottom: 10px;
  }
  .item-period {
    color: $color-silverChalice;
    margin: 3px 0;
    font-size: 14px;
    line-height: 1.4em;
  }
  .item-company {
    display: block;
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.45em;
    color: $color-quickSilver;
    word-break: break-all;
  }
  .item-logo {
    display: block;
    margin-bottom: 10px;
    img {
      max-height: 40px;
    }
  }
}
</style>
