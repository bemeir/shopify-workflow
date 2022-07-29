const fg = require('fast-glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const devtool = mode === 'development' ? 'eval-cheap-source-map' : false;


module.exports = {
    mode: mode,
    devtool: devtool,
    entry: fg.sync('./src/js/bundles/**/*.js').reduce((acc, path) => {
        const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
        acc[entry] = path;
        return acc;
    }, {}),
    output: {
        filename: './assets/bundle.[name].js',
        path: path.resolve(__dirname, './'),
    },

    resolve: {
        alias: {
            Styles: path.resolve(__dirname, 'src/styles/'),
            Helpers: path.resolve(__dirname, 'src/styles/helpers/')
        }
    },

    module: {
        rules: [
            {
                // Extract any CSS or SCSS content and minimize
                test: /\.[s]?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 2 } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ]
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: './assets/bundle.[name].css.liquid',
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: 'src/liquid/templates/customers/*.liquid',
                    to: 'templates/customers/[name][ext]',
                },
                {
                    from: 'src/liquid/templates/*.json',
                    to: 'templates/[name][ext]'
                },
                {
                    from: 'src/liquid/templates/*.liquid',
                    to: 'templates/[name][ext]'
                },
                {
                    from: 'src/liquid/layout/*.liquid',
                    to: 'layout/[name][ext]'
                },
                {
                    from: 'src/locales/*.json',
                    to: 'templates/customers/[name][ext]'
                },
                {
                    from: 'src/liquid/snippets/**/*.liquid',
                    to: 'snippets/[name][ext]'
                }]

        })
    ],
    devServer: {
        watchContentBase: true,
        contentBase: path.resolve(__dirname, './'),
        open: true
    }
};