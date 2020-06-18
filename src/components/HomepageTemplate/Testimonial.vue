<template lang="pug">
  div
    div.row
      div.col-xs-12.col-sm-12
        div.block-title
          h3 Testimonials

    div.row
      div.col-xs-12.col-sm-12
        div.testimonials.owl-carousel

          div.testimonial(v-for="testimonial in list" :key="testimonial.author")
            div.img
              img(src="../../assets/images/main_photo.jpg" alt="name")
            div.text
              p {{ testimonial.content }}

            div.author-info
              h4.author {{ testimonial.author }}
              h5.company {{ testimonial.company }}
              div.icon
                font-awesome-icon(:icon="['fas', 'quote-right']")
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.testimonial {
  text-align: center;
  border: 2px solid #444;
  border-radius: 20px;
  margin: 45px 2px 10px;
  padding: 0 25px 15px 25px;
  img {
    max-width: 90px;
    max-height: 90px;
    margin: -45px auto 20px;
    border-radius: 90px;
    box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.22);
  }
  .text {
    text-align: left;
    font-style: italic;
  }
  .author-info {
    position: relative;
    text-align: left;
    margin-top: 20px;
    .icon {
      content: '';
      position: absolute;
      font-size: 30px;
      right: 0;
      top: 7px;
      color: #0ba376;
      opacity: 0.5;
    }
    .author {
      margin: 0;
      font-size: 15px;
    }
    .company {
      color: #a5a6a7;
      font-size: 13px;
      font-weight: 300;
      margin: 0;
    }
  }
}
</style>