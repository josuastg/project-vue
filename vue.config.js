module.exports ={
   "devServer": {
        "proxy": {
            "/api": {
                "target": 'http://algo-api-dev.lionparcel.com/',
                "pathRewrite": {
                    '^/api': ''
                },
                "ws": true,
                "changeOrigin": true,
                "secure": false
            }
        }
    }
}