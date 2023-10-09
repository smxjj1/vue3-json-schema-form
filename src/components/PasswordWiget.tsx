/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-13 13:51:23
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-08 17:10:41
 * @FilePath: \vue3-json-schema-form\src\components\PasswordWiget.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CommonWidgetPropsDefine, CommonWidgetDefine } from "../../lib/types";
import { defineComponent } from "vue";

import { withFormItem } from "../../lib/theme-default/FormItem";

const PasswordWidget: CommonWidgetDefine = withFormItem(
	defineComponent({
		name: "PasswordWidget",
		props: CommonWidgetPropsDefine,
		setup(props) {
			const handleChange = (e: any) => {
				const value = e.target.value;
				props.onChange(value);
			};
			return () => {
				return (
					<input
						type="password"
						value={props.value as any}
						onInput={handleChange}
					/>
				);
			};
		},
	})
);

export default PasswordWidget;
