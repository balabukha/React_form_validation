const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: __dirname + '/src/js',
    entry: './index.jsx',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: [
            __dirname + '/src/js',
            __dirname + '/src/static',
            // __dirname + '/src/css'
            ]

    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015",'stage-0', 'env', 'react'],
                    }
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                },
                    {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                    {
                    loader: "less-loader" // compiles Less to CSS
                }
                ]
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [ 'url-loader' ]
            }
    ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
    // postcss: [
    //     autoprefixer({browsers: ['last 2 versions', 'IE 9']})
    // ]

};