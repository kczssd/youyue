const pxtoviewport = require('postcss-px-to-viewport')
const proxy = require('http-proxy-middleware');
var devEnv = require('./config/dev.env');
var proEnv = require('./config/pro.env');
const env = process.env.NODE_ENV;
let target;
if (env === 'production') {  // 生产环境
    target = proEnv.proxy;
} else {  // 本地环境
    target = devEnv.proxy;
}
module.exports = {
    publicPath: process.env.NODE_ENV !== 'development' ? '/game/youyue/' : '/',
    outputDir: 'build',
    indexPath: 'index.html',
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
        proxy: target,
    }
}