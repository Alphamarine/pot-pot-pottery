const path = require("path");
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./src/assets/styles/variables.scss";
          @import "./src/assets/styles/extends.scss";
        `,
      },
    },
  },
};
