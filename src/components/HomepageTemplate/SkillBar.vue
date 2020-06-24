<template lang="pug">
  div.skills-info
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
    background-color: $color-eerieBlack;
    border: 1px solid $color-greenMunsell;
    border-radius: 8px;
    box-sizing: border-box;
    height: 10px;
    margin-bottom: 8px;
    width: 100%;
    &:before {
      content: '';
      position: absolute;
      background-color: $color-greenMunsell;
    }
  }
  .skill-value {
    font-size: 11px;
    line-height: 1.1em;
    position: relative;
    float: right;
    margin: 0 0 4px;
    color: $color-silverChalice;
  }
  .skill-percentage {
    background-color: $color-greenMunsell;
    border: 2px solid $color-eerieBlack;
    border-radius: 9px;
    height: 8px;
    padding: 0;
  }
}
</style>