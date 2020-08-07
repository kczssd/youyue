module.exports = {
    NODE_ENV: '"development"',
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