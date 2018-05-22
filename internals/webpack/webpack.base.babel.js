/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = (options) => ({
    entry: options.entry,
    
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},

    output: Object.assign({
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
    }, options.output),

    resolve: {
        modules: ["src", "node_modules"],
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
        ],
        mainFields: [
            "browser",
            "jsnext:main",
            "main",
        ]
    },

    plugins: options.plugins.concat([
        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin(),
        new CheckerPlugin(),
    ]),
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: options.babelQuery,
                },
            },
            {
                test: /\.(ts|tsx)/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|otf|tff|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ],
    },
})