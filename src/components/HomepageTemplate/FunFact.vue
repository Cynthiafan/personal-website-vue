<template lang="pug">
div

  div.row
    div.col-xs-12.col-sm-12
      div.block-title
        h3 Interests/ 
          span Hobbies 

  div.row

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact.gray-default
        div.icon
          font-awesome-icon(:icon="['fas', 'volleyball-ball']")
        h4 Volleyball
        span.fun-fact-block-value
        span.fun-fact-block-text Used to be a player in colleage department, and a reporter of self-media.

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact.gray-default
        div.icon
          font-awesome-icon(:icon="['fas', 'puzzle-piece']")
        h4 Jigsaw Puzzle
        span.fun-fact-block-value
        span.fun-fact-block-text Enjoy collecting and playing challenging jigsaw puzzles.

    div.col-xs-12.col-lg-4.col-md-6
      div.fun-fact.gray-default
        div.icon
          font-awesome-icon(:icon="['fas', 'film']")
        h4 Movie Appreciation
        span.fun-fact-block-value 
        span.fun-fact-block-text Obsessed with metaphor and symbols of movies which can make me taste the movie over again and again.

</template>
<style lang="scss" scoped>
.fun-fact {
  position: relative;
  text-align: center;
  width: 100%;
  display: block;
  margin: 0 0 15px;
  background: #333;
  padding: 25px 10px 15px;
  border: 2px solid #444;
  border-radius: 10px;
  box-shadow: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 17px rgba(0, 0, 0, 0.12);
  }
  .gray-bg {
    background-color: #fcfcfc;
  }
  h4 {
    font-size: 16px;
    margin: 15px;
  }
  .icon {
    position: relative;
    font-size: 33px;
    color: #0ba376;
    margin-bottom: 6px;
    text-align: center;
    svg {
      width: 33px;
      height: 33px;
    }
  }
  .lm-info-block {
    font-size: 24px;
    font-weight: 400;
    display: block;
    margin: 10px 0;
    color: #0ba376;
  }
  .fun-fact-block-value {
    color: #aaa;
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