<template lang="pug">
div

  div.row
    div.col-xs-12.col-sm-12
      div.block-title
        h3 What 
          span I Do

  div.row
  
    div.col-xs-12.col-sm-6
      //- div.col-inner
      div.info-list-w-icon
        div.info-block-w-icon
          div.ci-icon
            i.lnr.lnr-code
          div.ci-text
            h4 Web Development
            p {{ $t(`${page}.webDev`) }}

    div.col-xs-12.col-sm-6
      div.col-inner
        div.info-list-w-icon
          div.info-block-w-icon
            div.ci-icon
              i.lnr.lnr-pencil
            div.ci-text
              h4 Copywriting
              p {{ $t(`${page}.copywriting`) }}
              
</template>
<script>
export default {
  props: {
    page: String,
  },
};
</script>
<style lang="scss" scoped>
.info-block-w-icon {
  margin-bottom: 25px;
  .ci-text {
    h4 {
      margin: 5px 0;
    }
    p {
      font-size: 0.95em;
    }
  }
  .ci-icon {
    display: table-cell;
    width: 54px;
    padding-right: 25px;
  }
  i {
    position: relative;
    font-size: 42px;
    color: $color-greenMunsell;
    opacity: 0.7;
  }
}
</style>