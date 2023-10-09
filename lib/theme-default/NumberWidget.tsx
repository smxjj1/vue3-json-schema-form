/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-25 18:17:35
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 17:02:38
 * @FilePath: \vue3-json-schema-form\lib\theme-default\TextWidget.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CommonWidgetPropsDefine } from "../types";
import { defineComponent } from "vue";
import { withFormItem } from "./FormItem";
const NumberWidget = withFormItem(
	defineComponent({
		name: "NumberWidget",
		props: CommonWidgetPropsDefine,
		setup(props) {
			const handleChange = (e: any) => {
				const value = e.target.value;
				e.target.value = props.value;
				props.onChange(value);
			};

			return () => {
				return (
					<input
						type="number"
						value={props.value as any}
						onInput={handleChange}
					/>
				);
			};
		},
	})
);

export default NumberWidget;
