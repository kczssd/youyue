const pxtoviewport = require('postcss-px-to-viewport')
const proxy = require('http-proxy-middleware');
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",
                        viewportWidth: 375,
                        unitPrecision: 5,
                        propList: [
                            "*"
                        ],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/domain': {
                target: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/domain': '/'
                }
            },
            '/redomain': {
                target: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/redomain': '/'
                }
            }
        }
    }
}