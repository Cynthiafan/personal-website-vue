<template lang="pug">
  section#experience
    div.block-title Where I've Worked
    div.flex-between-center
      ul
        li(v-for="company in companies" :key="company") {{ company }}
      div.job-description
        

</template>
<script>
export default {
  data() {
    return {
      companies: ['RE', 'CrowdInsight', 'Lovemove'],
    };
  },
};
</script>
<style lang="scss" scoped>
</style>