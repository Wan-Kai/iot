const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

//const BASE_URL = process.env.NODE_ENV === "production" ? "/iotp/" : "/iotp/";

const publicPath = process.env.BASE_URL;

module.exports = {
  publicPath: publicPath,

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1EAF84",
          "link-color": "#1EAF84",
          "border-radius-base": "2px",
          "font-size-base": "12px"
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
  },
  chainWebpack(config) {
    config.entry("main").add("babel-polyfill");
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },
  devServer: {
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true //配置自动启动浏览器
    //proxy: 'http://188.131.172.171:8080' // 配置跨域处理,只有一个代理

    // 配置多个代理
    // proxy: {
    //   "/api": {
    //     target: "http://188.131.172.171:8080", // 要访问的接口域名
    //     ws: true, // 是否启用websockets
    //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       "^/api": "/api"
    //     }
    //   },
    //   "/pro": {
    //     target: "http://ns.zmvision.cn:8080", // 要访问的接口域名
    //     ws: true, // 是否启用websockets
    //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       "^/pro": ""
    //     }
    //   }
    // }
  }
};
