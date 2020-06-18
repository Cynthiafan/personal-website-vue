<template lang="pug">
  section.animated-section(data-id="about-me")
    div.page-title
      h2 About 
        span Me

    div.section-content

      //-- Personal Information] --
      div.row
        div.col-xs-12.col-sm-7
          p I’m a creative and enthusiastic front-end developer with 2+ years of experience building and maintaining responsive websites/applications. I have strong experience with aesthetics and interaction, as well as commitment to the best experience for all users. Diverse professional education experiences have enabled me to understand a variety of user viewpoints.

        div.col-xs-12.col-sm-5
          InfoList(:list="$store.state.information")
        
      div.white-space-50
      //--------------------------


      //------- [Services] -------
      Service
      div.white-space-30
      //--------------------------


      //----- [Testimonials] -----
      Testimonial(:list="$store.state.testimonials")
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
      FunFact
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
};
</script>