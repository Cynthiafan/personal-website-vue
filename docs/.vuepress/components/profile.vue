<template lang="pug">
  div.profile
    blockAbout
    blockResume
</template>

<script>
import profileDataZh from '../data/resume-zh';
import profileDataEn from '../data/resume-en';
import blockAbout from './profileAbout';
import blockResume from './profileResume';

export default {
  components: {
    blockAbout,
    blockResume,
  },
  computed: {
    profileData() {
      switch(this.$lang) {
        case 'zh-TW': 
          return profileDataZh;
        case 'en-US':
          return profileDataEn;
        default:
          return profileDataEn;
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>