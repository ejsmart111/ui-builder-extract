const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        extract: false,
    },
    filenameHashing: false,
    chainWebpack: config => {
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
    },
})