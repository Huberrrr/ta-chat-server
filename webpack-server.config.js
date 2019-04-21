const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/server/index.js",
    mode: "production",
    target: "node",
    output: {
        path: __dirname,
        filename: "server.js"
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()]
};