<template lang="pug">
  div

    div.row
      div.col-xs-12.col-sm-12
        div.block-title
          h3 Cilents

    div.row
      div.col-xs-12.col-sm-12
        div.clients.owl-carousel
                    
          div.client-block
            a(href="#" target="_blank" title="Logo")
              img(alt="Logo")

</template>
<style lang="scss" scoped>
.clients.owl-carousel .client-block {
  padding: 15px;
  margin-bottom: 15px;
}

.client-block {
  text-align: center;
  padding: 5px 0;
  margin-bottom: 30px;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
</style>