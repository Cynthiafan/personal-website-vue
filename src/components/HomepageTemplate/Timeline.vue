<template lang="pug">
  div.timeline.timeline-second-style.clearfix

    div.timeline-item.clearfix(v-for="item in list" :key="item.company")
      div.left-part
        h5.item-period {{ item.period.start }} - {{ item.period.end }}
        span.item-company {{ item.company }}
      div.divider
      div.right-part
        h4.item-title {{ item.title }}
        p {{ item.description }}
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
.timeline-second-style {
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
  }
  .left-part {
    width: 30%;
    display: table-cell;
    padding-right: 25px;
    min-height: 100%;
    text-align: right;
    vertical-align: top;
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
  }
  .divider {
    position: absolute;
    top: 0;
    left: 30%;
    bottom: 0;
    width: 1px;
    background-color: #444;
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
      background-color: #0ba376;
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
      background-color: #222;
      border-radius: 5px;
      border: 2px solid #0ba376;
      z-index: 1;
    }
  }
  .item-title {
    font-size: 16px;
    margin-bottom: 3px;
  }
  .item-period {
    color: #aaa;
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
    color: #a5a6a7;
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