module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/reset.scss";
          @import "@/assets/scss/main.scss";
        `
      },
    }
  }
};