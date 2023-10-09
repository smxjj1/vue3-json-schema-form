/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-13 15:07:23
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-09 10:17:38
 * @FilePath: \vue3-json-schema-form\lib\SchemaForm.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
	defineComponent,
	provide,
	PropType,
	Ref,
	watch,
	shallowRef,
	watchEffect,
	ref,
	computed,
} from "vue";
import {
	Schema,
	UISchema,
	CustomFormat,
	CommonWidgetDefine,
	CustomKeyword,
} from "./types";
import SchemaItem from "./SchemaItem";
import { SchemaFormContextKey } from "./context";
import { validateFormData, ErrorSchema } from "./validator";
import Ajv, { Options } from "ajv";
interface ContextRef {
	doValidate: () => Promise<{
		errors: any;
		valid: boolean;
	}>;
}
const defaultAjvOptions: Options = {
	allErrors: true,
	// jsonPointers: true,
};
export default defineComponent({
	name: "SchemaForm",
	props: {
		schema: {
			type: Object as PropType<Schema>,
			required: true,
		},
		rootSchema: { type: Object as PropType<Schema>, required: true },
		value: {
			required: true,
		},
		onChange: {
			type: Function as PropType<(v: any) => void>,
			required: true,
		},
		contextRef: {
			type: Object as PropType<Ref<ContextRef | undefined>>,
		},
		ajvOptions: {
			type: Object as PropType<Options>,
		},
		locale: {
			type: String,
			default: "zh",
		},
		customValidate: {
			type: Function as PropType<(data: any, errors: any) => void>,
		},
		customFormats: {
			type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
		},
		customKeywords: {
			type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
		},
		uiSchema: {
			type: Object as PropType<UISchema>,
		},
	},
	setup(props, ctx) {
		const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any;
		const errorSchemaRef: Ref<ErrorSchema> = shallowRef({});
		watchEffect(() => {
			validatorRef.value = new Ajv({
				...defaultAjvOptions,
				...(props.ajvOptions as any),
			});

			if (props.customFormats) {
				const customFormats = Array.isArray(props.customFormats)
					? props.customFormats
					: [props.customFormats];
				customFormats.forEach((format) => {
					validatorRef.value.addFormat(
						format.name,
						format.definition
					);
				});
			}
			if (props.customKeywords) {
				const customKeywords = Array.isArray(props.customKeywords)
					? props.customKeywords
					: [props.customKeywords];
				customKeywords.forEach((keyword) =>
					validatorRef.value.addKeyword(
						keyword.name,
						keyword.deinition
					)
				);
			}
		});
		const validateResolveRef = ref();
		const validateIndex = ref(0);
		watch(
			() => props.value,
			() => {
				if (validateResolveRef.value) {
					doValidate();
				}
			},
			{ deep: true }
		);
		async function doValidate() {
			console.log("start validate -------->");
			const index = (validateIndex.value += 1);
			const result = await validateFormData(
				validatorRef.value,
				props.value,
				props.schema,
				props.locale,
				props.customValidate
			);

			if (index !== validateIndex.value) return;
			console.log("end validate -------->");

			errorSchemaRef.value = result.errorSchema;

			validateResolveRef.value(result);
			validateResolveRef.value = undefined;

			// return result
		}
		watch(
			() => props.contextRef,
			() => {
				if (props.contextRef) {
					props.contextRef.value = {
						doValidate() {
							return new Promise((resolve) => {
								validateResolveRef.value = resolve;
								doValidate();
							});
						},
					};
				}
			},
			{
				immediate: true,
			}
		);
		const formatMapRef = computed(() => {
			if (props.customFormats) {
				const customFormats = Array.isArray(props.customFormats)
					? props.customFormats
					: [props.customFormats];
				return customFormats.reduce((result, format) => {
					// validatorRef.value.addFormat(format.name, format.definition)
					result[format.name] = format.component;
					return result;
				}, {} as { [key: string]: CommonWidgetDefine });
			} else {
				return {};
			}
		});
		const transformSchemaRef = computed(() => {
			if (props.customKeywords) {
				const customKeywords = Array.isArray(props.customKeywords)
					? props.customKeywords
					: [props.customKeywords];

				return (schema: Schema) => {
					let newSchema = schema;
					customKeywords.forEach((keyword) => {
						if ((newSchema as any)[keyword.name]) {
							newSchema = keyword.transformSchema(schema);
						}
					});
					return newSchema;
				};
			}
			return (s: Schema) => s;
		});

		const context: any = {
			SchemaItem,
			formatMapRef,
			transformSchemaRef,
			// theme: props.theme,
		};
		provide(SchemaFormContextKey, context);
		return () => {
			const { schema, value, uiSchema } = props;
			const handlechange = (v: any) => {
				props.onChange(v);
			};
			return (
				<SchemaItem
					schema={schema}
					rootSchema={schema}
					uiSchema={uiSchema || { key: "" }}
					value={value}
					onChange={handlechange}
					errorSchema={errorSchemaRef.value || {}}
				/>
			);
		};
	},
});
