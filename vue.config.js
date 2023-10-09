/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-11 15:16:25
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-22 09:54:24
 * @FilePath: \vue3-json-schema-form\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const { defineConfig } = require("@vue/cli-service");
// vue.config.js
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const isLib = process.env.TYPE === "lib";
module.exports = {
	chainWebpack(config) {
		if (!isLib) {
			config.plugin("monaco").use(new MonacoWebpackPlugin());
		}
		config.plugin("circular").use(new CircularDependencyPlugin());
	},
	transpileDependencies: true,
};
