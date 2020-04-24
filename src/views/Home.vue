<template lang="pug">
  div.home-page 
    header
      navigation-bar
    main
      landing
      about
      experience
      skill
      portfolio

</template>
<script>
import NavigationBar from '@/components/NavigationBar';
import Landing from '@/components/HomeLanding';
import About from '@/components/HomeAbout';
import Experience from '@/components/HomeExperience';
import Portfolio from '@/components/HomePortfolio';
import Skill from '@/components/HomeSkill';

export default {
  components: {
    NavigationBar,
    Landing,
    About,
    Experience,
    Portfolio,
    Skill,
  },
  name: 'home',
};
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
  font-family: $font-mono;
  background: $color-homepageBackground;
  color: $color-lightgray;
}
header {
  width: 100%;
  position: fixed;
}
main {
  padding: 0px 60px;
  & > section {
    min-height: 100vh;
    padding: 20px;
  }
}
</style>
