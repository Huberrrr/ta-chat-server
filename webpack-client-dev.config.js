const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 8080,
        open: true,
        publicPath: "http://localhost:8080/dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};