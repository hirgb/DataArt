module.exports = {
    devServer: {
        port: 3333,
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.xtmin$/,
                use: ["./xtmin-loader.js"],
            }]
        },
    }
}