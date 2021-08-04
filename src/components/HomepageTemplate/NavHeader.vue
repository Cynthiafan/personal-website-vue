<template lang="pug">
  header.header(:class="{ 'mobile-menu-hide': !isMenuOpen }")

    div.header-content
      div.header-photo
        img(src="@/assets/images/photo.jpg" alt="Cynthia Fan")
      div.header-titles
        h2 Cynthia Fan
        h4 {{ $t(`${page}.frontendDeveloper`) }}

    //- Right side nav
    ul.main-menu
      li(v-for="block in $store.state.blocks" :key="block.path")
        router-link(
          :to="block.path" 
          :class="{ active: block.path === currentPath }")
          span.menu-icon.lnr(:class="block.icon")
          span.link-text {{ $_handleI18n(block, page, 'text') }}
      li.language
        div.divide
        div.nav-item(@click="toggleLanguage")
          font-awesome-icon(:icon="['fas', 'globe']")
          div.text-group
            span.text(:class="{ active: locale === 'zh' }") 中
            span  |  
            span.text(:class="{ active: locale === 'en' }") EN

    //- Left side nav content below titles
    div.social-links
      ul
        li(v-for="link in $store.state.links" :key="link.key")
          a(:href="link.url" target="_blank" rel="noopener noreferrer")
            font-awesome-icon(:icon="link.icon")

    //- div.header-buttons
    //-   a.download-btn(download="Frontend_Cynthia" :href="`/resume/${locale}_202005.pdf`") {{ $t(`${page}.downloadCV`) }}

    div.copyrights {{ currentYear }} All rights reserved.
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      page: 'menu',
    };
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['locale']),
    currentPath() {
      return this.$route.path;
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    ...mapActions(['switchLocale']),
    toggleLanguage() {
      const locale = this.locale === 'zh' ? 'en' : 'zh';

      this.switchLocale(locale);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  user-select: none;
}

.header {
  float: left;
  width: 100%;
  max-width: 380px;
  height: 100%;
  max-height: 80vh;
  min-height: inherit;
  text-align: center;
  padding: 56px 30px 45px;
  overflow: auto;
  @include respond-to(md) {
    max-width: 330px;
  }
  @include respond-to(sm) {
    max-height: none;
    position: absolute;
    width: 100%;
    max-width: 330px;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-onyx;
    z-index: 99;
    padding: 30px 30px 10px 30px;
    text-align: center;
    opacity: 1;
    visibility: visible;
    overflow: auto;
    transition: all 0.4s ease-in-out;
    &.mobile-menu-hide {
      width: 0;
      right: 0;
      margin-right: -100%;
      overflow: hidden;
      box-shadow: none;
    }
  }
}

.header-content {
  .header-photo {
    position: relative;
    width: 180px;
    margin: 0 auto 30px;
    z-index: 1;
    img {
      max-width: 100%;
      background-color: $color-white;
      border: 3px solid $color-white;
      border-radius: 300px;
    }
    &:after {
      position: absolute;
      opacity: 0.3;
      top: 7%;
      left: 7%;
      border-radius: 300px;
      content: '';
      height: calc(100% + 0px);
      width: calc(100% + 0px);
      background-image: -webkit-repeating-radial-gradient(
        center center,
        $color-white,
        $color-white 1px,
        transparent 0px,
        transparent 100%
      );
      background-image: -moz-repeating-radial-gradient(
        center center,
        $color-white,
        $color-white 1px,
        transparent 0px,
        transparent 100%
      );
      background-image: -ms-repeating-radial-gradient(
        center center,
        $color-white,
        $color-white 1px,
        transparent 0px,
        transparent 100%
      );
      background-size: 6px 6px;
      z-index: -1;
    }
    @include respond-to(sm) {
      max-width: 130px;
      margin-bottom: 25px;
    }
  }
  .header-titles {
    h2 {
      font-size: 36px;
      font-weight: 600;
      color: $color-cultured;
      margin: 5px 0 7px;
      line-height: 1.2em;
    }
    h4 {
      font-size: 18px;
      font-weight: 300;
      color: $color-grayX11;
      margin: 5px 0;
      line-height: 1.2em;
    }
    @include respond-to(sm) {
      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }
      h4 {
        font-size: 17px;
      }
    }
  }
}

ul.main-menu {
  a {
    display: block;
  }
  // Custom language switch button
  .language {
    font-size: 14px;
    padding: 0 15px;
    margin-top: 10px;
    cursor: pointer;
    .divide {
      border-top: 1px dashed $color-grayX11-200;
      margin-bottom: 10px;
    }
    svg {
      font-size: 25px;
    }
    .text-group {
      font-size: 12px;
      .active {
        color: $color-greenMunsell;
      }
    }
  }
  @include respond-to(mmd) {
    position: absolute;
    padding: 15px 0;
    width: 70px;
    right: -90px;
    background-color: $color-onyx;
    border-radius: 35px;
    z-index: 999;
    list-style: none;
    top: 0;
    box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.15);

    a {
      position: relative;
      color: $color-grayX11-200;
      padding: 10px;
      &.active,
      &:focus,
      &:hover {
        color: $color-greenMunsell;
      }
      &:hover {
        .link-text {
          right: 100%;
          visibility: visible;
          opacity: 1;
        }
      }
    }
    .menu-icon {
      display: block;
      font-size: 30px;
    }
    .link-text {
      position: absolute;
      width: auto;
      visibility: hidden;
      opacity: 0;
      color: $color-white;
      padding: 2px 10px;
      background-color: $color-greenMunsell;
      white-space: nowrap;
      right: 0;
      top: -50%;
      margin-top: 50%;
      transition: all 0.3s ease-in-out;
      z-index: 0;
      box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.22);
    }
  }
  @include respond-to(sm) {
    margin: 30px 0;
    a {
      color: $color-white;
      padding: 12px 0;
      line-height: 21px;
      opacity: 0.7;
      &.active {
        opacity: 1;
      }
    }
    .menu-icon {
      display: none;
    }
    .link-text {
      font-size: 16px;
      line-height: 21px;
    }
  }
}

.social-links {
  margin: 20px 0;
  ul {
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      a {
        color: $color-white;
        border-radius: 20px;
        font-size: 18px;
        padding: 0;
        height: 30px;
        width: 30px;
        display: block;
        line-height: 30px;
        text-align: center;
        opacity: 0.9;
        &:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
}

.header-buttons {
  margin: 35px 0 20px;
  .download-btn {
    background-color: transparent;
    color: $color-cultured;
    border: 2px solid $color-cultured;
    padding: 0.6em 2.1em;
    outline: 0;
    border-radius: 30px;
    &:hover {
      background-color: $color-white;
      color: $color-greenMunsell;
      border: 1px solid $color-white;
    }
  }
}

.copyrights {
  color: $color-grayX11;
  padding: 5px 10px 15px;
  font-size: 12px;
  text-align: center;
  @include respond-to(sm) {
    right: 0;
    width: 100%;
    position: relative;
    margin-top: 30px;
  }
}
</style>
