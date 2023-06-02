module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/reset.scss';
          @import '@/assets/scss/main.scss';
        `,
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
