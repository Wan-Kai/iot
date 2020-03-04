module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1EAF84",
          "link-color": "#1EAF84",
          "border-radius-base": "2px"
        },
        javascriptEnabled: true
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  }
};
