const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        inject: true, // Inject all files generated by webpack into html
        template: 'src/app/index.html',
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
    }),
];

module.exports = require('./webpack.base.babel')({
    // Add hot reloading in development mode
    entry: [
        'eventsource-polyfill', // Necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true',
        path.join(process.cwd(), 'src/app/index.tsx'),
    ],

    mode: 'development',

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    plugins: plugins,

    devtool: 'eval-source-map',

    performance: {
        hints: false,
    },
});