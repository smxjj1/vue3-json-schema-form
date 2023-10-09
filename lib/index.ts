/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-13 15:06:04
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-25 17:08:32
 * @FilePath: \vue3-json-schema-form\lib\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import SchemaFrom from "./SchemaForm";
import SchemaItem from "./SchemaItem";
import NumberFieldVue from "./fields/NumberField.vue";
import StringFieldVue from "./fields/StringField.vue";
import ArrayFiled, { ArrayItemWrapper } from "./fields/ArrayFiled";
import SelectionWidget from "./widgets/Selection";
import ThemeProvider from "./theme";
export * from "./types";
export {
	NumberFieldVue,
	StringFieldVue,
	ArrayFiled,
	SelectionWidget,
	ArrayItemWrapper,
	SchemaItem,
	ThemeProvider,
};
export default SchemaFrom;
