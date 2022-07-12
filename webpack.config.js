const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const ENV = process.env.APP_ENV;
const isTest = ENV === 'test';
const isProd = ENV === 'prod';

function setDevTool() {  // function to set dev-tool depending on environment
    if (isTest) {
        return 'inline-source-map';
    } else if (isProd) {
        return 'source-map';
    } else {
        return 'eval-source-map';
    }
}


let config = {
    entry: [path.resolve(__dirname, "src", "index.jsx")],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",

    },
    resolve: {
        modules: ['node_modules', 'src', 'components'],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/env', "@babel/react"],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader',],
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBasePublicPath: '/static',
        contentBase: path.resolve(__dirname, './static'),
    },
    devtool: setDevTool()
    ,
    plugins: [
        new HtmlWebpackPlugin({hash: true, template: path.resolve(__dirname, "src", "index.html"),})
    ]
};

module.exports = config;
