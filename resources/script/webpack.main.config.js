const path = require('path');
const webpack = require("webpack");
const _externals = require('externals-dependencies');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
    devtool: isEnvDevelopment ? 'source-map' : false,
    mode: isEnvProduction ? 'production' : 'development',
    target: "electron-main",
    externals: _externals(),
    entry: {
        main: './src/lib/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        path: path.resolve('dist')
    },
    node: {
        global: false,
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            dist: path.resolve('dist')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
