/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-25 13:49:37
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-09 09:43:54
 * @FilePath: \vue3-json-schema-form\lib\theme.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
	ComputedRef,
	PropType,
	computed,
	defineComponent,
	inject,
	provide,
	ref,
	ExtractPropTypes,
} from "vue";
import {
	Theme,
	SelectionWidgetNames,
	CommonWidgetNames,
	FiledPropsDefine,
	CommonWidgetDefine,
} from "./types";
import { isObject } from "./utils";
import { useVJSFContext } from "./context";
const THEME_PROVIDER_KEY = Symbol();
const ThemeProvider = defineComponent({
	name: "VJSFThemeProvider",
	props: {
		theme: {
			type: Object as PropType<Theme>,
			required: true,
		},
	},
	setup(props, { slots }) {
		const context = computed(() => props.theme);
		provide(THEME_PROVIDER_KEY, context);
		return () => slots.default && slots.default();
	},
});
export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
	name: T,
	props?: ExtractPropTypes<typeof FiledPropsDefine>
) {
	const formContext = useVJSFContext();
	if (props) {
		const { uiSchema, schema } = props;
		if (uiSchema.widget && isObject(uiSchema.widget)) {
			return ref(uiSchema.widget as CommonWidgetDefine);
		}
		if (schema.format) {
			if (formContext.formatMapRef.value[schema.format]) {
				return ref(formContext.formatMapRef.value[schema.format]);
			}
		}
	}

	const context: ComputedRef<Theme> | undefined =
		inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY);
	if (!context) {
		throw new Error("vjsf theme required");
	}
	const widgetRef = computed(() => {
		return context.value.widgets[name];
	});
	return widgetRef;
}
export default ThemeProvider;
