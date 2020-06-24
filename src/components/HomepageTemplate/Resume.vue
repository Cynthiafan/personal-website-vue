<template lang="pug">
  section
    div.page-title
      h2 Resume

    div.section-content

      div.row
        div.col-xs-12.col-sm-7

          Block
            h3(slot="title") Experience
            Timeline(slot="content" :list="$store.state.experience" :page="page")
          
          div.white-space-50

          Block
            h3(slot="title") Education
            Timeline(slot="content" :list="$store.state.education" :page="page")

          div.white-space-50


        div.col-xs-12.col-sm-5

          Block
            h3(slot="title") Coding 
              span Skills
            SkillBar(slot="content" :skills="$store.state.skills" :page="page")

          div.white-space-10

          Block
            h3(slot="title") Language 
              span Skills
            SkillBar(slot="content" :skills="$store.state.languages" :page="page")

          div.white-space-10

          Block
            h3(slot="title") Knowledges
            ul.knowledges(slot="content")
              li(v-for="tag in $store.state.knowledgeTags" :key="tag") {{ tag }}

      div.white-space-50

      div.row
        
        div.col-xs-12.col-sm-12
          div.block-title
            h3 Certificates
      
      div.row

        div.col-xs-12.col-sm-6
          Certificates(:list="$store.state.certificates" :page="page")

    </div>
  </section>
</template>
<script>
import Certificates from '@/components/HomepageTemplate/Certificates';
import SkillBar from '@/components/HomepageTemplate/SkillBar';
import Timeline from '@/components/HomepageTemplate/Timeline';
import Block from '@/components/HomepageTemplate/Block';

export default {
  components: {
    Certificates,
    SkillBar,
    Timeline,
    Block,
  },
  data() {
    return {
      page: 'resume',
    };
  },
};
</script>
<style lang="scss" scoped>
.knowledges {
  list-style: none;
  li {
    display: inline-block;
    background-color: $color-greenMunsell;
    border-radius: 3px;
    color: $color-white;
    padding: 1px 10px;
    margin: 3px 2px;
    font-size: 13px;
  }
}
</style>