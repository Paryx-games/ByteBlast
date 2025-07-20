const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    // ─── Entry Points ─────────────────────────────────────
    entry: {
        main: path.resolve(__dirname, 'src/main.js'),
        preload: path.resolve(__dirname, 'src/preload.js'),
        renderer: path.resolve(__dirname, 'src/renderer/index.js'),
    },

    // ─── Target & Output ───────────────────────────────────
    target: 'electron-renderer',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    // ─── Loaders ───────────────────────────────────────────
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },

    // ─── Resolve ───────────────────────────────────────────
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm'],
    },

    // ─── Plugins ───────────────────────────────────────────
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/renderer/index.html'),
            chunks: ['renderer'],
        }),
    ],

    // ─── Experiments ───────────────────────────────────────
    experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true,
    },

    // ─── DevTools ──────────────────────────────────────────
    devtool: 'source-map',
};