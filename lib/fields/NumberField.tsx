/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-14 09:09:27
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 15:25:28
 * @FilePath: \vue3-json-schema-form\lib\fields\NumberField.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineComponent } from "vue";
import { FiledPropsDefine, CommonWidgetNames } from "../types";
import { getWidget } from "../theme";
export default defineComponent({
	name: "NumberFiled",
	props: FiledPropsDefine,
	setup(props) {
		const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget);
		const handleChange = (e: any) => {
			const value = e.target.value;
			const num = Number(value);
			if (Number.isNaN(num)) {
				props.onChange(undefined);
			} else {
				props.onChange(num);
			}
		};
		return () => {
			const NumberWidget = NumberWidgetRef.value;
			const { rootSchema, errorSchema, ...rest } = props;
			return (
				<NumberWidget
					{...rest}
					errors={errorSchema.__errors}
					onChange={handleChange}
				/>
			);
		};
	},
});
