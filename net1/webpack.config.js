const path = require('path');
const webpack = require('webpack');


const ROOT = path.resolve(__dirname, 'ts');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'OxilThemesNet1': 'index.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader','uglify-template-string-loader'],
                exclude: /node_modules/
            }
        ]
    },

   output: {
        library: 'OxilThemesNet1',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'net1.js',
        path: DESTINATION
    },
    resolve: {
        extensions: [ '.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    mode: "production"
};

