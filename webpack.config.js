const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
require("@babel/polyfill");

module.exports = env => {
const devMode = env.NODE_ENV !== 'production';
const optimization = () => {
    const config = {};
    if(!devMode) {
        config.minimizer = [new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }), new TerserPlugin()]
    }
    return config;
};
   return {
       entry: { index: ['@babel/polyfill' ,'./src/index.js'], news: ['@babel/polyfill' ,'./src/news.js'] },
       output: {
           path: path.resolve(__dirname, 'dist'),
           filename: devMode ? '[name].js' : '[name].[chunkhash].js'
       },
       module: {
           rules: [
               {
               test: /\.js$/,
                 use: {loader: "babel-loader",
                   options: {
                     presets: [
                       '@babel/preset-env'
                     ],
                     plugins: ["@babel/plugin-proposal-class-properties"]
                   }},
               exclude: /node_modules/
               },
               {
               test: /\.css$/,
               use: [(devMode?{loader: 'style-loader'}: {loader: MiniCssExtractPlugin.loader,
               options: {
                   publicPath: '../'
               }}), {
                   loader: 'css-loader',
                   options: {
                       importLoaders: 2
                   }
               },
                   'postcss-loader']
           },
               {
                   test: /\.(png|jpg|gif|ico|svg)$/,
                   use: [{
                       loader: 'file-loader',
                       options: {
                           name: '[name].[ext]',
                           outputPath: 'images',
                       }
                   }, {
                       loader: 'image-webpack-loader',
                       options: {
                           bypassOnDebug: devMode,
                       }
                   }],
                   exclude: /node_modules/
               },
               {
                   test: /\.(woff|woff2|eot|ttf|otf)$/,
                   use: [{
                       loader: 'file-loader',
                       options: {
                           name: '[name].[ext]',
                           outputPath: 'fonts',
                       }
                   }],
                   exclude: /node_modules/
               }
           ]
       },
       plugins: [
           new MiniCssExtractPlugin({
               filename: devMode ? 'pages/[name].css' : 'pages/[name].[contenthash].css'
           }),
           new HtmlWebpackPlugin({
               inject: false,
               template: './src/index.html',
               filename: 'index.html',
               chunks: ['index']
           }),
           new HtmlWebpackPlugin({
               inject: false,
               template: './src/news.html',
               filename: 'news.html',
               chunks: ['news']
           })
       ],
     devServer: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           pathRewrite: {'^/api' : ''}
         }
       }
     },
       optimization: optimization()
   }
};
