<template lang="pug">
  header#site_header.header(:class="{ 'mobile-menu-hide': !isMenuOpen }")

    div.header-content
      div.header-photo
        img(src="@/assets/images/main_photo.jpg" alt="Alex Smith")
      div.header-titles
        h2 Cynthia Fan
        h4 Frontend Developer

    //- Right side nav
    ul.main-menu
      li(v-for="block in $store.state.blocks" :key="block.path")
        router-link.nav-anim(
          :to="block.path" 
          :class="{ active: block.path === currentPath }")
          span.menu-icon.lnr(:class="block.icon")
          span.link-text {{ block.text }}
      li.toggle-language
        span.text 中
        div
        span.text EN

    div.social-links
      ul
        li(v-for="link in $store.state.links" :key="link.key")
          a(:href="link.url" target="_blank")
            font-awesome-icon(:icon="link.icon")

    div.header-buttons
      a.btn.btn-primary(download="Frontend_Cynthia" href="/resume/en_202005.pdf") Download CV

    div.copyrights {{ currentYear }} All rights reserved.
    

</template>
<script>
export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: inline-block;
  float: left;
  width: 100%;
  max-width: 380px;
  height: 100%;
  max-height: 80vh;
  min-height: inherit;
  text-align: center;
  padding: 56px 30px 45px;
  overflow: auto;
}

.header-titles {
  h2 {
    font-size: 36px;
    font-weight: 600;
    color: #f5f5f5;
    margin: 5px 0 7px;
    line-height: 1.2em;
  }

  h4 {
    font-size: 18px;
    font-weight: 300;
    color: #bbb;
    margin: 5px 0;
    line-height: 1.2em;
  }
}

@include respond-to(mmd) {
  ul.main-menu {
    position: absolute;
    padding: 15px 0;
    width: 70px;
    right: -90px;
    background-color: #444;
    border-radius: 35px;
    z-index: 999;
    list-style: none;
    top: 0;
    box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.15);

    a {
      display: block;
      position: relative;
      color: #b5b6b7;
      padding: 10px;
      &.active,
      &:focus,
      &:hover {
        color: #0ba376;
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
      color: #fff;
      padding: 2px 10px;
      background-color: #0ba376;
      white-space: nowrap;
      right: 0;
      top: -50%;
      margin-top: 50%;
      transition: all 0.3s ease-in-out;
      z-index: 0;
      box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.22);
    }
  }
}
@include respond-to(sm) {
  ul.main-menu {
    margin: 30px 0;
    a {
      display: block;
      color: #fff;
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

.header-photo {
  position: relative;
  width: 180px;
  margin: 0 auto 30px;
  z-index: 1;
  img {
    max-width: 100%;
    background-color: #fff;
    border: 3px solid #fff;
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
      #fff,
      #fff 1px,
      transparent 0px,
      transparent 100%
    );
    background-image: -moz-repeating-radial-gradient(center center, #fff, #fff 1px, transparent 0px, transparent 100%);
    background-image: -ms-repeating-radial-gradient(center center, #fff, #fff 1px, transparent 0px, transparent 100%);
    background-size: 6px 6px;
    z-index: -1;
  }
}

/* --- Social Links --- */
.social-links {
  margin: 20px 0;
  ul {
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      a {
        color: #fff;
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
/* --- End Social Links --- */

.header-buttons {
  margin-top: 15px;
  .btn-primary {
    background-color: transparent;
    color: #f5f5f5;
    border-color: #f5f5f5;
    &:hover {
      background-color: #fff;
      color: #0ba376;
      border: 1px solid #fff;
    }
  }
}

.copyrights {
  color: #bbb;
  padding: 5px 10px 15px;
  font-size: 12px;
  text-align: center;
}

@include respond-to(sm) {
  .mobile-menu-hide {
    width: 0;
    right: 0;
    margin-right: -100%;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    box-shadow: none;
  }
}
</style>