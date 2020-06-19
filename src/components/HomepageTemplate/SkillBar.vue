<template lang="pug">
div
  div.skills-info.skills-second-style
    div(v-for="item in skills" :key="item.label")
      div.skill.clearfix
        h4 {{ $_handleI18n(item, page, 'label') }}
        div.skill-value {{ item.text ? $_handleI18n(item, page, 'text') : item.value }}
      div.skill-container
        div.skill-percentage(:style="`width: ${item.value}`")
</template>
<script>
export default {
  props: {
    skills: {
      type: Array,
    },
    page: String,
  },
};
</script>
<style lang="scss" scoped>
.skills-info {
  &.skills-second-style {
    margin-bottom: 30px;
    h4 {
      font-size: 13px;
      line-height: 1.1em;
      position: relative;
      float: left;
      margin: 0 0 4px;
    }
    .skill-container {
      position: relative;
      display: inline-block;
      background-color: #222;
      border: 1px solid #0ba376;
      border-radius: 8px;
      box-sizing: border-box;
      height: 10px;
      margin-bottom: 8px;
      width: 100%;
      &:before {
        content: '';
        position: absolute;
        background-color: #0ba376;
      }
    }
    .skill-value {
      font-size: 11px;
      line-height: 1.1em;
      position: relative;
      float: right;
      margin: 0 0 4px;
      color: #aaa;
    }
    .skill-percentage {
      background-color: #0ba376;
      border: 2px solid #222;
      border-radius: 9px;
      height: 8px;
      padding: 0;
    }
  }
}
</style>