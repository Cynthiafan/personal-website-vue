<template lang="pug">
  section
    div.centered
      div.row
        div.col-sm-12.col-md-12.col-lg-12
          div.title-block
            h2 Cynthia Fan
            div.sp-subtitle Front-end Developer
</template>
<style lang="scss" scoped>
.centered {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  .row {
    width: 100%;
  }
}
.title-block {
  position: relative;
  text-align: center;
  h2 {
    color: #f5f5f5;
    font-size: 60px;
    line-height: 74px;
    margin: 0;
    text-align: center;
    @include respond-to(sm) {
      font-size: 48px;
      line-height: 56px;
      margin: 0 0 10px;
      text-align: center;
    }
  }
  .sp-subtitle {
    color: #aaa;
    font-size: 21px;
    font-weight: 300;
    margin: 5px 0;
    text-align: center;
    @include respond-to(sm) {
      font-size: 18px;
    }
  }
}
</style>