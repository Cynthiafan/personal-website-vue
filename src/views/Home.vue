<template lang="pug">
  div

    //- Loading animation 
    transition(name="fade" mode="out-in")
      Preloader(v-if="!isWebsiteLoaded")

    //- Animated Background 
    div.lm-animated-bg 

    div.page
      div.page-content(:class="{ mobile: isMobile }")
        
        NavHeader(:isMenuOpen="isMenuOpen")

        //- Mobile Navigation
        div.menu-toggle(@click="isMenuOpen = !isMenuOpen" :class="{ open: isMenuOpen }")
          span
          span
          span

        //- Arrows Nav
        ArrowsNav

        div.content-area
          div.sections
            transition(name="fade" mode="out-in")
              keep-alive
                router-view(:key="$route.name")
</template>
<script>
import Preloader from '@/components/HomepageTemplate/Preloader';
import NavHeader from '@/components/HomepageTemplate/NavHeader';
import ArrowsNav from '@/components/HomepageTemplate/ArrowsNav';
import { mapGetters } from 'vuex';
import device from 'current-device';

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
  computed: {
    ...mapGetters(['locale']),
    isMobile() {
      return device.mobile();
    },
  },
  watch: {
    locale() {
      this.closeMenu();
    },
  },
  mounted() {
    window.addEventListener('load', this.closePreloader);
  },
  beforeRouteUpdate(to, from, next) {
    this.closeMenu();

    next();
  },
  beforeDestroy() {
    window.removeEventListener('load', this.closePreloader);
  },
  methods: {
    closePreloader() {
      this.isWebsiteLoaded = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.lm-animated-bg {
  background-image: url('~@/assets/images/bg-main.png');
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
  @include respond-to(sm) {
    display: none;
  }
}

.page {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0 100px;
  overflow: hidden;
  @include respond-to(md) {
    padding-left: 30px;
  }
  @include respond-to(sm) {
    padding: 0;
  }
  .page-content {
    position: relative;
    width: 100%;
    max-width: 1280px;
    min-height: 80vh;
    margin: 10vh auto;
    padding: 0;
    background-color: $color-onyx;
    box-shadow: 0 0 100px -5px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    @include respond-to(sm) {
      padding: 0;
      margin: 0;
      border-radius: 0;
      height: 100vh;
      &.mobile {
        max-height: stretch;
      }
    }
  }
}

.page-content {
  .menu-toggle {
    display: none;
    width: 48px;
    height: 48px;
    line-height: 46px;
    text-align: center;
    background-color: $color-greenMunsell;
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
      background: $color-white;
      border-radius: 5px;
      opacity: 1;
      left: 25%;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
      transform-origin: left center;
      &:nth-child(1) {
        top: 16px;
      }
      &:nth-child(2) {
        top: 22px;
      }
      &:nth-child(3) {
        top: 28px;
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
    @include respond-to(sm) {
      display: block;
    }
  }
  .content-area {
    position: absolute;
    right: 0;
    background-color: transparent;
    height: 100%;
    width: 100%;
    max-width: calc(100% - 380px);
    @include respond-to(md) {
      max-width: calc(100% - 330px);
    }
    @include respond-to(sm) {
      max-width: 100%;
    }
    .sections {
      position: relative;
      height: 100%;
      perspective: 1500px;
      background-color: $color-eerieBlack;
      border-radius: 30px;
      @include respond-to(sm) {
        border-radius: 0;
      }
      & > section {
        position: absolute;

        height: 100%;
        width: 100%;

        padding: 60px;
        overflow: auto;
        z-index: 999;
        background-repeat: no-repeat;
        background-position: center;
        background-position: 50% 50%;
        background-size: cover;
        overflow: auto;
        visibility: visible;
        z-index: 99;
        &.scroll-lock {
          overflow: hidden;
        }
      }
    }
  }
}
</style>
