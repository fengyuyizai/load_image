const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = false
module.exports = {
    entry: [
        "./app/main.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundles.js'
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                // include: [
                //     path.resolve(__dirname, 'app/css')
                // ],
                // exclude: '/node_modules/',
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "stylus-loader",
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            filename: "index.html",
                inject: true,
                hash: true,
            minify: {
                removeComments: true, // 删除html中的注释代码
                collapseWhitespace: true, // 删除html中的空白符
                removeAttributeQuotes: true // 删除html元素中属性的引号
            },
            chunksSortMode: 'dependency' // 按dependency的顺序引入
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: 'css/[id].[hash].css',
        })
    ]
}