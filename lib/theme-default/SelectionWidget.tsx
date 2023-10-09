/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-25 10:20:14
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 15:53:17
 * @FilePath: \vue3-json-schema-form\lib\theme-default\SelectionWidget.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineComponent, ref, watch, watchEffect } from "vue";
import { SelectionWidgetPropsDefine } from "../types";
import { withFormItem } from "./FormItem";
const SelectionWidget = withFormItem(
	defineComponent({
		name: "SelectionWidget",
		props: SelectionWidgetPropsDefine,
		setup(props) {
			const currentValueRef = ref(props.value);

			watch(currentValueRef, (newv) => {
				if (newv !== props.value) {
					props.onChange(newv);
				}
			});

			watch(
				() => props.value,
				(v) => {
					if (v !== currentValueRef.value) {
						currentValueRef.value = v;
					}
				}
			);

			watchEffect(() => {
				console.log(currentValueRef.value, "------------->");
			});

			return () => {
				const { options } = props;
				return (
					<select multiple={true} v-model={currentValueRef.value}>
						{options.map((op) => (
							<option value={op.value}>{op.key}</option>
						))}
					</select>
				);
			};
		},
	})
);
export default SelectionWidget;
