'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
require('events').EventEmitter.defaultMaxListeners = 0
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  runtimeCompiler: true,
  filenameHashing: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    // public: 'union.tanglei.top',
    useLocalIp: true,
    disableHostCheck: true,
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    // after: require('./mock/mock-server.js'),
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // logLevel: 'silent', // debug|silent|warn
        target: 'http://websocket.tanglei.top', // 你请求的第三方接口
        changeOrigin: true,
        pathRewrite: { // 路径重写
          ['^' + process.env.VUE_APP_BASE_API]: '' // 替换的请求地址
        }
      },
      'qt/': {
        target: 'http://qt.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'qt/': ''
        }
      },
      'qtimage/': {
        target: 'http://qtimage.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'qtimage/': ''
        }
      },
      'map/': {
        target: 'http://localhost:8000',
        changeOrgin: true,
        pathRewrite: {
          'map/': ''
        }
      },
      'map1/': {
        target: 'http://localhost:8001',
        changeOrgin: true,
        pathRewrite: {
          'map1/': ''
        }
      },
      'map2/': {
        target: 'http://localhost:8002',
        changeOrgin: true,
        pathRewrite: {
          'map2/': ''
        }
      },
      'prod-mock/': {
        target: 'http://websocket.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'dev-mock/': ''
        }
      },
      'dev-mock/': {
        target: 'http://websocket.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'dev-mock/': ''
        }
      },
      'tanglei/': {
        target: 'http://127.0.0.1:81',
        changeOrgin: true,
        pathRewrite: {
          'tanglei/': ''
        }
      },
      'test/': {
        target: 'http://192.168.0.180:9527',
        changeOrgin: true,
        pathRewrite: {
          'test/': ''
        }
      },
      'ycl/': {
        target: 'http://ycl.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'ycl/': ''
        }
      },
      'lcc/': {
        target: 'http://lcc.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'lcc/': ''
        }
      },
      'yhl/': {
        target: 'http://yhl.tanglei.top',
        changeOrgin: true,
        pathRewrite: {
          'yhl/': ''
        }
      },
      'tl/': {
        target: 'http://127.0.0.1:9500',
        changeOrgin: true,
        pathRewrite: {
          'tl/': ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    devtool: 'source-map', // tanglei
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      // 'element-ui': 'ELEMENT',
      // 'axios': 'axios',
      'AMap': 'AMap'
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
