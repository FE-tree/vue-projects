module.exports = {
    // lintOnSave: false,
    devServer: {
        port: 1314,
        proxy: {
            "/api": {
                target: "http://skyend.top:6060",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};