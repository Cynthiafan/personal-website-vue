<template lang="pug">
  section#about
    h3.block-title About me
    a.primary.s(download="Frontend_Cynthia" href="/resume/en_202005.pdf") Download Resume
</template>
<script>
import PieChart from '@/components/PieChart/PieChart';
export default {
  components: {
    PieChart,
  },
};
</script>
<style lang="scss" scoped>
</style>