const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/server/index.js",
    mode: "production",
    target: "node",
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "server.js"
    },
    externals: [nodeExternals()]
};