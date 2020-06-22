import Vue from 'vue';

Vue.mixin({
  methods: {
    $_handleI18n(item, page, key) {
      return item.i18n ? this.$t(`${page}.${item[key]}`) : item[key];
    },
  },
});
