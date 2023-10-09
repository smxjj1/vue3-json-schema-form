/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-14 09:09:12
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-09 09:06:40
 * @FilePath: \vue3-json-schema-form\lib\fields\StringField.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, defineComponent } from "vue";
import { FiledPropsDefine, CommonWidgetNames } from "../types";
import { getWidget } from "../theme";
export default defineComponent({
	name: "StringField",
	props: FiledPropsDefine,
	setup(props, ctx) {
		const TextWidgetRef = computed(() => {
			const widgetRef = getWidget(CommonWidgetNames.TextWidget, props);
			return widgetRef.value;
		});

		const widgetOptionsRef = computed(() => {
			const { widget, properties, items, ...rest } = props.uiSchema;
			return rest;
		});

		const handleChange = (v: string) => {
			props.onChange(v);
		};
		return () => {
			const TextWidget = TextWidgetRef.value;
			const { rootSchema, errorSchema, ...rest } = props;
			return (
				<TextWidget
					{...rest}
					onChange={handleChange}
					errors={errorSchema.__errors}
					options={widgetOptionsRef.value}
				/>
			);
		};
	},
});
