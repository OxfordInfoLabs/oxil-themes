const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'NetCommerce': 'net-commerce.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        "allowTsInNodeModules": true
                    }

                },
                    'uglify-template-string-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: ["/node_modules/", "/src/blog.sass", "/assets/"],
                use: [ MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },

   output: {
        library: 'NetCommerce',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'net-commerce.js',
       path: DESTINATION
    },
    resolve: {
        extensions: [ '.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "net-commerce.css"
        })
    ],
    mode: "production"
};

