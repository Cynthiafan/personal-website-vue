<template lang="pug">
  section.animated-section(data-id="about-me")
    div.page-title
      h2 About 
        span Me

    div.section-content

      //-- Personal Information] --
      div.row
        div.col-xs-12.col-sm-7
          p {{ $t(`${page}.intro`) }}

        div.col-xs-12.col-sm-5
          InfoList(:list="$store.state.information" :page="page")
        
      div.white-space-50
      //--------------------------


      //------- [Services] -------
      Service(:page="page")
      div.white-space-30
      //--------------------------


      //----- [Testimonials] -----
      Testimonial(:list="$store.state.testimonials" :page="page")
      div.white-space-50
      //--------------------------

      //-------- [Client] --------
      //- Component: <Client>
      //- div.white-space-50
      //--------------------------

      //------- [Pricing] --------
      //- Component: <Price>
      //- div.white-space-50
      //--------------------------


      //------ [Fun Facts] -------
      FunFact(:page="page")
      //--------------------------

    </div>
  </section>
</template>
<script>
import InfoList from '@/components/HomepageTemplate/InfoList';
import Testimonial from '@/components/HomepageTemplate/Testimonial';
import Service from '@/components/HomepageTemplate/Service';
import FunFact from '@/components/HomepageTemplate/FunFact';

export default {
  components: {
    InfoList,
    Testimonial,
    Service,
    FunFact,
  },
  data() {
    return {
      page: 'about',
    };
  },
};
</script>