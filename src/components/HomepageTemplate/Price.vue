<template lang="pug">
  div

    div.row
      div.col-xs-12.col-sm-12
        div.block-title
          h3 Pricing

    div.row
      div.col-xs-12.col-sm-12
        div.fw-pricing.clearfix.row
          
          div.fw-package-wrap.col-md-6
            div.fw-package
              div.fw-heading-row
                span Silver
              
              div.fw-pricing-row
                span $64
                small per month
              
              div.fw-button-row
                a.btn.btn-secondary(href="#" target="_self") Free Trial

              div.fw-default-row Lorem ipsum dolor
              div.fw-default-row Pellentesque scelerisque
              div.fw-default-row Morbi eu sagittis
          
          div.fw-package-wrap.col-md-6.highlight-col
            div.fw-package
              div.fw-heading-row
                span Gold
              
              div.fw-pricing-row
                span $128
                small per month

              div.fw-button-row
                a.btn.btn-primary(href="#" target="_self") Free Trial
              
              div.fw-default-row Lorem ipsum dolor
              div.fw-default-row Pellentesque scelerisque
              div.fw-default-row Morbi eu sagittis
              div.fw-default-row Donec non diam
</template>
<style lang="scss" scoped>
.fw-pricing {
  .fw-package {
    background-color: #333;
    border: 2px solid #444;
    border-radius: 15px;
    padding: 30px 30px;
    margin-bottom: 10px;
    text-align: center;
    transition: all 0.2s ease-in-out;
  }
  .fw-package-wrap.highlight-col .fw-package {
    transform: translateY(-5px);
    box-shadow: 0 7px 12px rgba(0, 0, 0, 0.12);
  }
  .fw-package:hover,
  .fw-package-wrap.highlight-col .fw-package:hover {
    transform: translateY(-9px);
    box-shadow: 0 18px 24px rgba(0, 0, 0, 0.15);
    .fw-package-wrap.highlight-col {
      .fw-heading-row {
        span {
          position: relative;
          display: inline-block;
          &:after {
            content: '';
            height: 2px;
            margin-top: 0;
            background-color: #0ba376;
            position: absolute;
            left: 0;
            bottom: -3px;
            right: 0;
          }
        }
      }
    }
  }
  .fw-pricing-row {
    padding: 30px 0 10px;
    span {
      display: block;
      line-height: 1;
      color: #f5f5f5;
      font-size: 42px;
    }
    .fw-pricing .fw-pricing-row small {
      color: #aaa;
      display: block;
    }
  }
  .fw-default-row {
    padding: 5px 0;
    font-size: 14px;
  }
  .fw-button-row {
    padding: 10px 0 20px;
  }
  .fw-price-icon-no:before {
    content: '\f068';
    color: #e87878;
  }
  .fw-price-icon-yes:before {
    content: '\f058';
    color: #ade878;
  }
}
</style>