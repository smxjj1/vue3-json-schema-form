/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-18 17:02:42
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-08 10:30:20
 * @FilePath: \vue3-json-schema-form\lib\fields\ObjectFiled.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineComponent } from "vue";
import { FiledPropsDefine } from "../types";
import { useVJSFContext } from "../context";
import { isObject } from "../utils";

export default defineComponent({
	name: "ObjectFiled",
	props: FiledPropsDefine,
	setup(props) {
		const context = useVJSFContext();
		const value: any = isObject(props.value) ? props.value : {};
		const handleObjectFiledChange = (k: string, v: any) => {
			if (v === undefined) {
				delete value[k];
			} else {
				value[k] = v;
			}
			props.onChange(value);
		};
		return () => {
			const { schema, rootSchema, value, errorSchema, uiSchema } = props;
			const { SchemaItem } = context;
			const properties = schema.properties || {};
			const currentValue: any = isObject(value) ? value : {};
			return Object.keys(properties).map((key: string, index: number) => {
				return (
					<SchemaItem
						schema={properties[key]}
						rootSchema={rootSchema}
						uiSchema={
							uiSchema.properties
								? uiSchema.properties[key] || { key: "" }
								: { key: "" }
						}
						errorSchema={errorSchema[key] || {}}
						value={currentValue[key]}
						key={index}
						onChange={(v: any) => handleObjectFiledChange(key, v)}
					/>
				);
			});
		};
	},
});
