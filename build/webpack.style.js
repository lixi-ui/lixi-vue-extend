var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var config = {
  mode:"production",
  entry: {
    styles: path.resolve(process.cwd() , './src/style/src/index.scss')
  },
  output: {
    path: path.resolve(process.cwd(), './lib/style/'),
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      'src': path.join(__dirname, '../src'),
      'g-ui':  path.join(__dirname, '../')
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 1 
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}

webpack(config, function (err) {
  if(err){
    console.log(err)
  } else {
    console.log("build ok")
  }
})
