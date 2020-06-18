<template lang="pug">
  div.homepage
    //- Loading animation 
    transition(name="fade" mode="out-in")
      Preloader(v-if="!isWebsiteLoaded")

    //- Animated Background 
    div.lm-animated-bg 

    div.page
      div.page-content
        
        NavHeader(:isMenuOpen="isMenuOpen")

        //- Mobile Navigation
        div.menu-toggle(@click="isMenuOpen = !isMenuOpen" :class="{ open: isMenuOpen }")
          span
          span
          span

        //- Arrows Nav
        ArrowsNav

        div.content-area
          div.animated-sections
            router-view
</template>
<script>
import Preloader from '@/components/HomepageTemplate/Preloader';
import NavHeader from '@/components/HomepageTemplate/NavHeader';
import ArrowsNav from '@/components/HomepageTemplate/ArrowsNav';

export default {
  components: {
    Preloader,
    NavHeader,
    ArrowsNav,
  },
  data() {
    return {
      isWebsiteLoaded: false,
      isMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener('load', this.closePreloader);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
    next();
  },
  beforeDestroy() {
    window.removeEventListener('load', this.closePreloader);
  },
  methods: {
    closePreloader() {
      this.isWebsiteLoaded = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.lm-animated-bg {
  background-image: url('~@/assets/images/main_bg.png');
  position: absolute;
  width: auto;
  height: auto;
  top: -28px;
  left: -28px;
  right: -28px;
  bottom: -28px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}

.page {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0 100px;
  overflow: hidden;
  .page-content {
    position: relative;
    width: 100%;
    max-width: 1280px;
    min-height: 80vh;
    margin: 10vh auto;
    padding: 0;
    background-color: #444;
    box-shadow: 0 0 100px -5px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    // -webkit-backface-visibility: hidden;
    // -moz-backface-visibility: hidden;
    // backface-visibility: hidden;
  }

  .content-area {
    position: absolute;
    right: 0;
    background-color: transparent;
    height: 100%;
    width: 100%;
    max-width: calc(100% - 380px);
  }
  @include respond-to(md) {
    padding-left: 30px;
    .header {
      max-width: 330px;
    }

    .content-area {
      max-width: calc(100% - 330px);
    }
  }
  @include respond-to(sm) {
    padding: 0;
    .page-content {
      padding: 0;
      margin: 0;
      border-radius: 0;
      min-height: 100vh;
    }
    .content-area {
      max-width: 100%;
    }
  }
}

.menu-toggle {
  display: none;
  width: 48px;
  height: 48px;
  line-height: 46px;
  text-align: center;
  background-color: #0ba376;
  right: 10px;
  font-size: 19px;
  top: 10px;
  border-radius: 30px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: 900;
  position: absolute;
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 50%;
    background: #fff;
    border-radius: 5px;
    opacity: 1;
    left: 25%;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    &:nth-child(1) {
      top: 16px;
      transform-origin: left center;
    }
    &:nth-child(2) {
      top: 22px;
      transform-origin: left center;
    }
    &:nth-child(3) {
      top: 28px;
      transform-origin: left center;
    }
  }
  &.open {
    span {
      &:nth-child(1) {
        transform: rotate(45deg);
        top: 13px;
        left: 15px;
      }
      &:nth-child(2) {
        width: 0%;
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
        top: 30px;
        left: 15px;
      }
    }
  }
}
@include respond-to(sm) {
  .menu-toggle {
    display: block;
  }
}
</style>
