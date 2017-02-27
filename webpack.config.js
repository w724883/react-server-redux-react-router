var webpack = require('webpack');
var path = require('path');
// 分离css文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 动态加载html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = [{
  name: "browser",
  //页面入口文件配置
  entry: {
    home:'./app/index.js'
  },
  //入口文件输出配置
  output: {
    // 配置静态资源引入路径
    publicPath : 'http://localhost:3000/',
    path:path.join(__dirname, 'static'),
    filename: 'js/[name].js',
  },
  // 插件项
  plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: "common",
      //     filename:"common.js",
      //     minChunks: 2
      // }),
      new HtmlWebpackPlugin({
          filename: path.join(__dirname, 'src/templates/home.ejs'),
          inject: 'body',
          chunks:['home'],
          template: 'src/templates/home.html',
          chunksSortMode:'dependency',
          hash:true,
          data: {
            html:'<%-html%>',
            store:'<%-store%>'
          }
      }),
      new ExtractTextPlugin("css/[name].css"),
      new webpack.DefinePlugin({
        '__CLIENT__': true
      })
      // new webpack.optimize.UglifyJsPlugin({
      //     compress: {
      //         warnings: false
      //     },
      //     output: {
      //       comments: false
      //     }
      // })

      // new webpack.DefinePlugin({
      //   'process.env': {
      //     'NODE_ENV': '"production"'
      //   }
      // })
  ],
  module: {
      //加载器配置
      loaders: [
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          },
          {
              test: /\.js[x]?$/,
              loaders: ['jsx-loader','babel-loader?presets[]=react,presets[]=es2015'],
              exclude:/node_modules/
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
          }
      ]
  },

  //其它解决方案配置
  resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss'],
      // alias:{
      //     "zepto":(path.join(__dirname, "src/libs/zepto/zepto.min.js"))
      // }
  }
}
// ,{
//   name: "server-side rendering",
//   entry: {
//     home:"./server/components/home/index.js",
//   },
//   target: "node",
//   output: {
//     filename: 'components/[name].js',
//     publicPath : '/static',
//     path:path.join(__dirname, 'output/server'),
//     libraryTarget: "commonjs2"
//   },
//   externals: /^[a-z\-0-9]+$/,
//   module: {
//     loaders: [
//         {
//             test: /\.css$/,
//             loader: ExtractTextPlugin.extract("style-loader", "css-loader")
//         },
//         {
//             test: /\.js[x]?$/,
//             loader: 'babel-loader?presets[]=react,presets[]=es2015',
//             exclude:/node_modules/
//         },
//         {
//             test: /\.scss$/,
//             loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
//         }
//     ]
//   }
// }
]

module.exports = config;
