/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-14 09:07:56
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-09 10:24:32
 * @FilePath: \vue3-json-schema-form\lib\SchemaItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, defineComponent } from "vue";
import { SchemaTypes } from "./types";
import StringField from "./fields/StringField";
import NumberFiled from "./fields/NumberField.vue";
import ArrayField from "./fields/ArrayFiled";
import { FiledPropsDefine } from "./types";
import { retrieveSchema } from "./utils";
import ObjectFiled from "./fields/ObjectFiled";
import { useVJSFContext } from "./context";
export default defineComponent({
	name: "SchemaItem",
	props: FiledPropsDefine,
	setup(props) {
		const formContext = useVJSFContext();
		const retrievedSchemaRef = computed(() => {
			const { schema, rootSchema, value } = props;
			return formContext.transformSchemaRef.value(
				retrieveSchema(schema, rootSchema, value)
			);
		});
		return () => {
			const { schema } = props;
			const type = schema.type;
			const retrievedSchema = retrievedSchemaRef.value;
			//TODO 如果type没有指定，我们自己判断type类型
			let Component: any;
			switch (type) {
				case SchemaTypes.NUMBER:
					Component = NumberFiled;
					break;
				case SchemaTypes.STRING:
					Component = StringField;
					break;
				case SchemaTypes.OBJECT:
					Component = ObjectFiled;
					break;
				case SchemaTypes.ARRAY: {
					Component = ArrayField;
					break;
				}
				default: {
					console.warn(`${type} is not supported`);
				}
			}
			return <Component {...props} schema={retrievedSchema} />;
		};
	},
});
