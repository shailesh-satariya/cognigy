const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const result = dotenv.config({path: prod ? '.env' : '.env.development'});

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            process: {env: JSON.stringify(result.parsed)}
        }),
    ],
    resolve: {
        plugins: [new TsconfigPathsPlugin({
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        })],
    }
};
