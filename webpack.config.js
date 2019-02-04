/*
* @Author: Xugai
* @Date:   2019-01-27 21:04:38
* @Last Modified by:   Xugai
* @Last Modified time: 2019-02-02 14:07:43
*/
// 推测require()是Node.js的库函数(类似JRE,它也会提供库函数供我们使用)
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    	filename: 'js/app.js'
  	},
    resolve: {
      alias: {
        page: path.resolve(__dirname, 'src/page'),
        component: path.resolve(__dirname, 'src/component'),
        util: path.resolve(__dirname, 'src/util'),
        service: path.resolve(__dirname, 'src/service')
      }
    },
  	module: {
  		rules: [
        // react语法(jsx)的解析
    		{
    			test: /\.m?jsx$/,
      		exclude: /(node_modules)/,
      		use: {
        		loader: 'babel-loader',
        		options: {
          		presets: ['env', 'react']
        		}
      		}
    		},
        // css样式的解析
    		{
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        // sass样式的解析
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        // 图片文件的解析
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              }
            }
          ]
        },
        // 图标字体的解析
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              }
            }
          ]
        }
  	 ],
	},
  plugins: [
      // 处理html文件
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './favicon.ico'
      }),
      // 独立css文件
      new ExtractTextPlugin("css/[name].css"),
      // 提取出公共模块
      new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          filename: 'js/base.js'
      })
  ],
  devServer: {
    // contentBase: './dist'
    port: 8081,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
};