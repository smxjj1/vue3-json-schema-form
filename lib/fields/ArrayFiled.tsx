/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-19 15:07:18
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-08 11:56:40
 * @FilePath: \vue3-json-schema-form\lib\fields\ArrayFiled.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PropType, defineComponent } from "vue";
import { FiledPropsDefine, Schema, SelectionWidgetNames } from "../types";
import { useVJSFContext } from "../context";
import { createUseStyles } from "vue-jss";
import { getWidget } from "../theme";
const useStyles = createUseStyles({
	container: {
		border: "1px solid #eee",
	},
	actions: {
		background: "#eee",
		padding: 10,
		textAlign: "right",
	},
	action: {
		"& + &": {
			marginLeft: 10,
		},
	},
	content: {
		padding: 10,
	},
});
const ArrayItemWrapper = defineComponent({
	name: "ArrayItemWrapper",
	props: {
		index: {
			type: Number,
			required: true,
		},
		onButtonClick: {
			type: Function as PropType<(type: string, index: number) => void>,
			required: true,
		},
	},
	setup(props, { slots }) {
		const onButtonClick = (type: string) =>
			props.onButtonClick(type, props.index);
		const classesRef = useStyles();
		return () => {
			const classes = classesRef.value;
			return (
				<div class={classes.container}>
					<div class={classes.actions}>
						<button
							class={classes.action}
							onClick={() => {
								onButtonClick("add");
							}}
						>
							新增
						</button>
						<button
							class={classes.action}
							onClick={() => {
								onButtonClick("delete");
							}}
						>
							删除
						</button>
						<button
							class={classes.action}
							onClick={() => {
								onButtonClick("up");
							}}
						>
							上移
						</button>
						<button
							class={classes.action}
							onClick={() => {
								onButtonClick("down");
							}}
						>
							下移
						</button>
					</div>
					<div>{slots.default && slots.default()}</div>
				</div>
			);
		};
	},
});
export { ArrayItemWrapper };
/**
 * {
 *   items: { type: string },
 * }
 *
 * {
 *   items: [
 *    { type: string },
 *    { type: number }
 *   ]
 * }
 *
 * {
 *   items: { type: string, enum: ['1', '2'] },
 * }
 */
export default defineComponent({
	name: "ArrayFiled",
	props: FiledPropsDefine,
	setup(props) {
		const context = useVJSFContext();
		const handleArrayItemChange = (v: any, index: number) => {
			const { value } = props;
			const arr = Array.isArray(value) ? value : [];
			arr[index] = v;
			props.onChange(arr);
		};

		const handleAdd = (index: number, arr: Array<[]>) => {
			arr.splice(index + 1, 0, undefined);
		};

		const handleDelete = (index: number, arr: Array<[]>) => {
			arr.splice(index, 1);
		};

		const handleUp = (index: number, arr: Array<[]>) => {
			if (index === 0) return;
			const item = arr.splice(index, 1);
			arr.splice(index - 1, 0, item[0]);

			props.onChange(arr);
		};

		const handleDown = (index: number, arr: Array<[]>) => {
			if (index === arr.length - 1) return;
			const item = arr.splice(index, 1);
			arr.splice(index + 1, 0, item[0]);
		};
		const handleButtonClick = (type: string, index: number) => {
			const { value } = props;
			const arr = Array.isArray(value) ? value : [];
			switch (type) {
				case "add":
					handleAdd(index, arr);
					break;
				case "delete":
					handleDelete(index, arr);
					break;
				case "up":
					handleUp(index, arr);
					break;
				case "down":
					handleDown(index, arr);
					break;
				default:
					break;
			}
			props.onChange(arr);
		};
		const SelectionWidgetRef = getWidget(
			SelectionWidgetNames.SelectionWidget
		);
		return () => {
			const SchemaItem = context.SchemaItem;
			const SelectionWidget = SelectionWidgetRef.value;
			const { schema, rootSchema, value, errorSchema, uiSchema } = props;
			const isMultiType = Array.isArray(schema.items);
			const isSelect = schema.items && (schema.items as any).enum;
			const arr = Array.isArray(value) ? value : [];
			if (isMultiType) {
				const items: Schema[] = schema.items as any;
				return items.map((s: Schema, index: number) => {
					const itemsUiSchema = uiSchema.items;
					const us = Array.isArray(itemsUiSchema)
						? itemsUiSchema[index] || {
								key: "",
						  }
						: itemsUiSchema || { key: "" };
					return (
						<SchemaItem
							schema={s}
							key={index}
							rootSchema={rootSchema}
							uiSchema={us}
							errorSchema={errorSchema[index] || {}}
							value={arr[index]}
							onChange={(v: any) =>
								handleArrayItemChange(v, index)
							}
						/>
					);
				});
			} else if (!isSelect) {
				return arr.map((v: any, index: number) => {
					return (
						<ArrayItemWrapper
							index={index}
							onButtonClick={(type: string, index: number) =>
								handleButtonClick(type, index)
							}
						>
							<SchemaItem
								schema={schema.items as Schema}
								value={v}
								uiSchema={(uiSchema.items as any) || {}}
								key={index}
								rootSchema={rootSchema}
								errorSchema={errorSchema[index] || {}}
								onChange={(v: any) =>
									handleArrayItemChange(v, index)
								}
							/>
						</ArrayItemWrapper>
					);
				});
			} else {
				const enumOptions = (schema as any).items.enum;
				const options = enumOptions.map((e: any) => ({
					key: e,
					value: e,
				}));
				return (
					<SelectionWidget
						onChange={props.onChange}
						value={props.value}
						options={options}
						errors={errorSchema.__errors}
						schema={schema}
					/>
				);
			}
		};
	},
});
