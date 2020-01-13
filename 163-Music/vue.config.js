module.exports = {
    // lintOnSave: false,
    devServer: {
        port: 1314,
        proxy: {
            "/api": {
                target: "http://music.skyend.top/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};