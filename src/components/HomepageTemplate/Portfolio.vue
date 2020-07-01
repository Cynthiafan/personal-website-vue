<template lang="pug">
  section(ref="portfolio" :class="{ 'scroll-lock': demoSource }")
    div.page-title
      h2 Portfolio

    div.row
      div.col-xs-12.col-sm-12
        div.blog-masonry
          
          div.item(v-for="item in $store.state.portfolio" :key="item.title")
            div.blog-card

              div.media-block
                button.action-btn(v-if="item.action" @click="clickActionBtn(item.action)") {{ item.action.text }}
                img(style="width: 100%" :src="require(`../../assets/images/${item.img}`)" :alt="item.title")
                div.mask

              div.post-info
                div.blog-item-title-group
                  h4.blog-item-title {{ $_handleI18n(item, page, 'title') }}
                  a(:href="item.repoUrl" v-if="item.repoUrl")
                    font-awesome-icon(:icon="['fab', 'github']")
                div.blog-tags
                  span(v-for="tag in item.tags" :key="tag") {{ tag }}

    transition(name="fade")
      div.subpage-modal(v-if="demoSource" :style="isLaptopSize ? `top: ${scrollTop}px` : ''")
        h5 Demo
        img(:src="demoSource")
        button(@click="demoSource = null")
          i.lnr.lnr-cross

</template>
<script>
export default {
  data() {
    return {
      page: 'portfolio',
      demoSource: null,
      scrollTop: 0,
      screenWidth: 0,
    };
  },
  computed: {
    isLaptopSize() {
      return this.screenWidth > 1024;
    },
  },
  methods: {
    clickActionBtn(action) {
      switch (action.type) {
        case 'url':
          const newPage = window.open(action.url, '_blank');
          newPage.opener = null;
          break;
        case 'video':
          this.demoSource = require(`../../assets/images/${action.video}`);
      }
    },
    getPosition(e) {
      this.scrollTop = e.target.scrollTop;
    },
    getScreenSize(e) {
      this.screenWidth = e.target.innerWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', this.getScreenSize);
    this.$refs.portfolio.addEventListener('scroll', this.getPosition);
    this.screenWidth = window.innerWidth;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getScreenSize);
    this.$refs.portfolio.removeEventListener('scroll', this.getPosition);
  },
};
</script>
<style lang="scss" scoped>
.blog-masonry {
  margin: 0 -1em 1.8em;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
    padding: 0 1em 2em;
    @include respond-to(ssm) {
      width: 100%;
    }
  }
}

.blog-card {
  display: block;
  position: relative;
  padding: 0;
  background: $color-onyx;
  .media-block {
    overflow: hidden;
    position: relative;
    img {
      transition: all 0.3s ease-in-out;
    }
    .mask {
      position: absolute;
      background: rgba(0, 0, 0, 0.65);
      line-height: 1;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 1;
      transition: all 0.2s ease-in-out;
    }
    .action-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      min-width: 100px;
      transform: translate(-50%, -50%);
      border-radius: 40px;
      border: 1px solid $color-white;
      color: $color-white;
      background-color: transparent;
      padding: 4px 10px;
      font-size: 13px;
      z-index: 2;
      &:hover {
        border-color: $color-greenMunsell;
        background-color: $color-greenMunsell;
        + img {
          transform: scale(1.1);
        }
      }
    }
  }
  .post-info {
    padding: 1em 1.4em 1.4em;
    border: 1px solid $color-onyx;
    border-top: 0;
    a {
      color: $color-white;
      font-size: 18px;
    }
    .blog-item-title-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .blog-item-title {
        margin: 5px 0 0 0;
      }
    }
    .blog-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 10px;
      span {
        background: rgba($color-greenMunsell, 0.1);
        color: $color-greenMunsell;
        border: 1px solid $color-greenMunsell;
        padding: 0 4px;
        font-size: 12px;
        border-radius: 4px;
        margin-top: 2px;
        margin-bottom: 2px;
        line-height: 1.6;
      }
      & > span:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
}

.subpage-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button {
    position: absolute;
    right: 20px;
    top: 20px;

    border: none;
    margin-top: 10px;
    padding: 10px;
    background-color: $color-greenMunsell;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 80%;
  }
  @include respond-to(sm) {
    position: fixed;
    min-width: 350px;
    width: 70%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>