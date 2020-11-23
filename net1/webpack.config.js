const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'net1': 'net1.ts',
        'net1-base': 'net1-base.ts'
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    output: {
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: '[name].js',
        path: DESTINATION
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ],
        alias: {
            'tippy.js': path.resolve(path.join(__dirname, 'node_modules', 'tippy.js')),
            'kinibind': path.resolve(path.join(__dirname, 'node_modules', 'kinibind')),
            'kiniauth': path.resolve(path.join(__dirname, 'node_modules', 'kiniauth')),
            'kinicart': path.resolve(path.join(__dirname, 'node_modules', 'kinicart'))
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "net1.css"
        })
    ],
    mode: "production"
};

