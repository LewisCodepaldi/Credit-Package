module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/assets/variables.scss";
          @import "src/assets/mixins.scss";
        `,
      },
    },
  },
};