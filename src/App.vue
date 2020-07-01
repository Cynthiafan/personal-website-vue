<template lang="pug">
  div#app
    //- Loading animation 
    transition(name="fade" mode="out-in")
      Preloader(v-if="!isWebsiteLoaded")
    router-view
</template>

<script>
import Preloader from '@/components/HomepageTemplate/Preloader';

export default {
  name: 'app',
  data() {
    return {
      isWebsiteLoaded: false,
    };
  },
  components: {
    Preloader,
  },
  mounted() {
    window.addEventListener('load', this.closePreloader);
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

<style lang="scss">
body {
  background-color: $color-greenMunsell;
  background: linear-gradient($color-ming, $color-greenMunsell);
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  font-size: 15px;
  font-family: 'Poppins', Helvetica, sans-serif;
  line-height: 1.65em;
  overflow: hidden;
  color: $color-lightgray;
  background-repeat: no-repeat;
  background-position: center;
  background-position: 50% 50%;
  background-size: cover;
}
</style>
