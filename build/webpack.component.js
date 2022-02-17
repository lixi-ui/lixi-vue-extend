const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugins = require('vue-loader/lib/plugin');

const Components = require('../components.json');


var config = {
  mode: "production",
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib/components/'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules'],
    alias: {
      'src': path.join(__dirname,'../src'),
      'lixiv-ui':  path.join(__dirname, '../'),
      'g-ui':  path.join(__dirname, '../'),
      "examples": path.join(__dirname, '../examples')
    }
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
          preserveWhitespace: false
        }
      },
      {
        test: /\.md/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
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
    new VueLoaderPlugins()
  ]
}


webpack(config,function(err,res){
  if (err) {
    console.log('err', err)
  } else {
    console.log("lib seccess");
  }
  // console.log("res", res);
});
