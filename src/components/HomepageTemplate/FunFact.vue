<template lang="pug">
div

  div.row
    div.col-xs-12.col-sm-12
      div.block-title
        h3 Interests/ 
          span Hobbies 

  div.row

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact
        div.icon
          font-awesome-icon(:icon="['fas', 'volleyball-ball']")
        h4 {{ $t(`${page}.volleyball`) }}
        span.fun-fact-block-value
        span.fun-fact-block-text {{ $t(`${page}.volleyballDescription`) }}

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact
        div.icon
          font-awesome-icon(:icon="['fas', 'puzzle-piece']")
        h4 {{ $t(`${page}.jigsawPuzzle`) }}
        span.fun-fact-block-value
        span.fun-fact-block-text {{ $t(`${page}.jigsawPuzzleDescription`) }}

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact
        div.icon
          font-awesome-icon(:icon="['fas', 'film']")
        h4 {{ $t(`${page}.movieAppreciation`) }}
        span.fun-fact-block-value 
        span.fun-fact-block-text {{ $t(`${page}.movieAppreciationDescription`) }}

</template>
<script>
export default {
  props: {
    page: String,
  },
};
</script>
<style lang="scss" scoped>
.fun-fact {
  position: relative;
  text-align: center;
  width: 100%;
  display: block;
  margin: 0 0 15px;
  background: $color-jet;
  padding: 25px 10px 15px;
  border: 2px solid $color-onyx;
  border-radius: 10px;
  box-shadow: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 17px rgba(0, 0, 0, 0.12);
  }
  .icon {
    position: relative;
    font-size: 33px;
    color: $color-greenMunsell;
    margin-bottom: 6px;
    text-align: center;
    svg {
      width: 33px;
      height: 33px;
    }
  }
  h4 {
    font-size: 16px;
    margin: 15px;
  }
  .fun-fact-block-value {
    color: $color-silverChalice;
    font-size: 36px;
    line-height: 50px;
    display: block;
    margin: 15px 0 10px;
  }
  .fun-fact-block-text {
    display: block;
  }
}
</style>