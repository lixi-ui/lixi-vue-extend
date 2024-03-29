const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugins = require('vue-loader/lib/plugin');

var config = {
  mode: "development",
  entry: {
    docs: path.resolve(process.cwd(), "./examples/main.js") 
  },
  output: {
    path: path.resolve(process.cwd(), './examples/g-ui/'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  // entry: {
  //   app: ['./src/index.js']
  // },
  // output: {
  //   path: path.resolve(process.cwd(), './lib'),
  //   publicPath: '/dist/',
  //   filename: 'index.js',
  //   chunkFilename: '[id].js',
  //   libraryTarget: 'umd',
  //   library: 'LIXI',
  //   umdNamedDefine: true
  // },
  // externals: {
  //   vue: {
  //     root: 'Vue',
  //     commonjs: 'vue',
  //     commonjs2: 'vue',
  //     amd: 'vue'
  //   }
  // },
  // entry: {
  //   app: ['./src/index.js']
  // },
  // output: {
  //   path: path.resolve(process.cwd(), './lib'),
  //   publicPath: '/dist/',
  //   filename: 'g-ui.common.js',
  //   chunkFilename: '[id].js',
  //   libraryTarget: 'commonjs2'
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules'],
    alias: {
      'src': path.join(__dirname, '../src'),
      'lixiv-ui':  path.join(__dirname, '../'),
      'g-ui':  path.join(__dirname, '../'),
      "examples": path.join(__dirname, '../examples')
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    publicPath: '/',
    noInfo: true
  },
  module: {
    rules:[
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /popper\.js/,
        loader: 'babel-loader',
        options: {
          presets:[
            ["@babel/preset-env", { "modules": false }],
            [
              '@vue/babel-preset-jsx',
              {
                functional: false,
              },
            ],
          ]
        }
      },
      {
        test: /\.(tsx?)$/,
        include: process.cwd(),
        loader: 'babel-loader',
        options: {
          presets:[
            [
              '@babel/preset-typescript',
              {
                allExtensions: true
              }
            ]
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          prettify: false
        }
      },
      {
        test: /\.md/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
                prettify: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: path.posix.join("static", 'img/[name].[hash:7].[ext]'),
          esModule: false
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/assets/images/g-logo.png'
    }),
    new webpack.DefinePlugin({
      EASY_ENV_IS_BROWSER:"'true'"
    }),
    new VueLoaderPlugins()
  ]
}

var server = new webpackDevServer(webpack(config));

server.listen(8888, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
});