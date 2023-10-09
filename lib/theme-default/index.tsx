/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-22 09:41:52
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 09:28:13
 * @FilePath: \vue3-json-schema-form\lib\theme-default\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEge
 */
import SelectionWidget from "./SelectionWidget";
import { CommonWidgetPropsDefine } from "../types";
import TextWidget from "./TextWidget";
import NumberWidget from "./NumberWidget";
import { defineComponent } from "vue";
const CommonWidget = defineComponent({
	props: CommonWidgetPropsDefine,
	setup() {
		return () => null;
	},
});
export default {
	widgets: {
		SelectionWidget,
		TextWidget,
		NumberWidget,
	},
};
