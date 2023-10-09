import { PropType, DefineComponent } from "vue";
import { ErrorSchema } from "./validator";
import { FormatDefinition, CompilationContext } from "ajv";
export enum SchemaTypes {
	"NUMBER" = "number",
	"INTEGER" = "integer",
	"STRING" = "string",
	"OBJECT" = "object",
	"ARRAY" = "array",
	"BOOLEAN" = "boolean",
}
type SchemaRef = { $ref: string };
export interface Schema {
	type: SchemaTypes | string;
	const?: any;
	format?: string;

	title?: string;
	default?: any;

	properties?: {
		[key: string]: Schema;
	};
	items?: Schema | Schema[] | SchemaRef;
	uniqueItems?: any;
	dependencies?: {
		[key: string]: string[] | Schema | SchemaRef;
	};
	oneOf?: Schema[];
	anyOf?: Schema[];
	allOf?: Schema[];
	// TODO: uiSchema
	// vjsf?: VueJsonSchemaConfig
	required?: string[];
	enum?: any[];
	enumNames?: any[];
	enumKeyValue?: any[];
	additionalProperties?: any;
	additionalItems?: Schema;
	minLength?: number;
	maxLength?: number;
	minimun?: number;
	maximum?: number;
	multipleOf?: number;
	exclusiveMaximum?: number;
	exclusiveMinimum?: number;
}
export const FiledPropsDefine = {
	schema: {
		type: Object as PropType<Schema>,
		required: true,
	},
	uiSchema: {
		type: Object as PropType<UISchema>,
		required: true,
	},
	value: {
		required: true,
	},
	onChange: {
		type: Function as PropType<(v: any) => void>,
		required: true,
	},
	rootSchema: {
		type: Object as PropType<Schema>,
		required: true,
	},
	errorSchema: {
		type: Object as PropType<ErrorSchema>,
		required: true,
	},
} as const;
export type UISchema = {
	key: string;
	widget?: string | CommonWidgetDefine;
	properties?: {
		[key: string]: UISchema;
	};
	items?: UISchema | UISchema[];
} & {
	[key: string]: any;
};
export const CommonWidgetPropsDefine = {
	value: {},
	onChange: {
		type: Function as PropType<(v: any) => void>,
		required: true,
	},
	errors: {
		type: Array as PropType<string[]>,
	},
	schema: {
		type: Object as PropType<Schema>,
		required: true,
	},
	options: {
		type: Object as any,
	},
} as const;
export type CommonWidgetDefine = DefineComponent<
	typeof CommonWidgetPropsDefine,
	// eslint-disable-next-line @typescript-eslint/ban-types
	{},
	// eslint-disable-next-line @typescript-eslint/ban-types
	{}
>;
export const SelectionWidgetPropsDefine = {
	...CommonWidgetPropsDefine,
	options: {
		type: Array as PropType<
			{
				key: string;
				value: any;
			}[]
		>,
		required: true,
	},
} as const;
export type SelectionWidgetDefine = DefineComponent<
	typeof SelectionWidgetPropsDefine,
	// eslint-disable-next-line @typescript-eslint/ban-types
	{},
	// eslint-disable-next-line @typescript-eslint/ban-types
	{}
>;
export type CommonFieldType = DefineComponent<typeof FiledPropsDefine>;
export enum SelectionWidgetNames {
	SelectionWidget = "SelectionWidget",
}
export enum CommonWidgetNames {
	TextWidget = "TextWidget",
	NumberWidget = "NumberWidget",
}
export interface Theme {
	widgets: {
		[SelectionWidgetNames.SelectionWidget]: SelectionWidgetDefine;
		[CommonWidgetNames.TextWidget]: CommonWidgetDefine;
		[CommonWidgetNames.NumberWidget]: CommonWidgetDefine;
	};
}
export interface CustomFormat {
	name: string;
	definition: FormatDefinition;
	component: CommonWidgetDefine;
}
interface VjsfKeywordDefinition {
	type?: string | Array<string>;
	async?: boolean;
	$data?: boolean;
	errors?: boolean | string;
	metaSchema?: object;
	// schema: false makes validate not to expect schema (ValidateFunction)
	schema?: boolean;
	statements?: boolean;
	dependencies?: Array<string>;
	modifying?: boolean;
	valid?: boolean;
	// one and only one of the following properties should be present
	macro: (
		schema: any,
		parentSchema: object,
		it: CompilationContext
	) => object | boolean;
}
export interface CustomKeyword {
	name: string;
	deinition: VjsfKeywordDefinition;
	transformSchema: (originSchema: Schema) => Schema;
}
