/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-12 11:09:01
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-09 10:28:10
 * @FilePath: \vue3-json-schema-form\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
import { defineComponent, reactive, Ref, ref, watchEffect } from "vue";
import { createUseStyles } from "vue-jss";
import MonacoEditor from "./components/MonacoEditor";
import demos from "./demos";
import SchemaForm, { ThemeProvider } from "../lib";
import { Schema } from "../lib/types";
import themeDefault from "../lib/theme-default";
import customFormat from "./plugins/customFormat";
import customKeywords from "./plugins/customKeyword";
// TODO: 在lib中export
// type Schema = any;
type UISchema = any;

function toJson(data: any) {
	return JSON.stringify(data, null, 2);
}
const useStyles = createUseStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "1200px",
		margin: "0 auto",
	},
	menu: {
		marginBottom: 20,
	},
	code: {
		width: 700,
		flexShrink: 0,
	},
	codePanel: {
		minHeight: 400,
		marginBottom: 20,
	},
	uiAndValue: {
		display: "flex",
		justifyContent: "space-between",
		"& > *": {
			width: "46%",
		},
	},
	content: {
		display: "flex",
	},
	form: {
		padding: "0 20px",
		flexGrow: 1,
	},
	menuButton: {
		appearance: "none",
		borderWidth: 0,
		backgroundColor: "transparent",
		cursor: "pointer",
		display: "inline-block",
		padding: 15,
		borderRadius: 5,
		"&:hover": {
			background: "#efefef",
		},
	},
	menuSelected: {
		background: "#337ab7",
		color: "#fff",
		"&:hover": {
			background: "#337ab7",
		},
	},
});
export default defineComponent({
	setup() {
		const selectedRef: Ref<number> = ref(0);
		const demo: {
			schema: Schema | null;
			data: any;
			uiSchema: UISchema | null;
			schemaCode: string;
			dataCode: string;
			uiSchemaCode: string;
			customValidate: ((d: any, e: any) => void) | undefined;
		} = reactive({
			schema: null,
			data: {},
			uiSchema: {},
			schemaCode: "",
			dataCode: "",
			uiSchemaCode: "",
			customValidate: undefined,
		});
		watchEffect(() => {
			const index = selectedRef.value;
			const d: any = demos[index];
			demo.schema = d.schema;
			demo.data = d.default;
			demo.uiSchema = d.uiSchema;
			demo.schemaCode = toJson(d.schema);
			demo.dataCode = toJson(d.default);
			demo.uiSchemaCode = toJson(d.uiSchema);
			demo.customValidate = d.customValidate;
		});
		const classesRef = useStyles();
		const handleChange = (v: any) => {
			demo.data = v;
			demo.dataCode = toJson(v);
		};
		function handleCodeChange(
			filed: "schema" | "data" | "uiSchema",
			value: string
		) {
			try {
				const json = JSON.parse(value);
				demo[filed] = json;
				(demo as any)[`${filed}Code`] = value;
			} catch (err) {
				// some thing
			}
		}
		const handleSchemaChange = (v: string) => handleCodeChange("schema", v);
		const handleDataChange = (v: string) => handleCodeChange("data", v);
		const handleUISchemaChange = (v: string) =>
			handleCodeChange("uiSchema", v);
		const contextRef = ref();
		function validateForm() {
			contextRef.value.doValidate().then((result: any) => {
				console.log(result, "......");
			});
		}
		return () => {
			const classes = classesRef.value;
			const selected = selectedRef.value;
			return (
				// <StyleThemeProvider>
				// <VJSFThemeProvider theme={theme as any}>
				<div class={classes.container}>
					<div class={classes.menu}>
						<h1>Vue3 JsonSchema Form</h1>
						<div>
							{demos.map((demo, index) => (
								<button
									class={{
										[classes.menuButton]: true,
										[classes.menuSelected]:
											index === selected,
									}}
									onClick={() => (selectedRef.value = index)}
								>
									{demo.name}
								</button>
							))}
						</div>
					</div>
					<div class={classes.content}>
						<div class={classes.code}>
							<MonacoEditor
								code={demo.schemaCode}
								class={classes.codePanel}
								onChange={handleSchemaChange}
								title="Schema"
							/>
							<div class={classes.uiAndValue}>
								<MonacoEditor
									code={demo.uiSchemaCode}
									class={classes.codePanel}
									onChange={handleUISchemaChange}
									title="UISchema"
								/>
								<MonacoEditor
									code={demo.dataCode}
									class={classes.codePanel}
									onChange={handleDataChange}
									title="Value"
								/>
							</div>
						</div>
						<div class={classes.form}>
							<ThemeProvider theme={themeDefault as any}>
								<SchemaForm
									rootSchema={demo.schema}
									schema={demo.schema}
									uiSchema={demo.uiSchema || {}}
									onChange={handleChange}
									value={demo.data}
									contextRef={contextRef}
									customFormats={customFormat}
									customKeywords={customKeywords}
									customValidate={demo.customValidate}
								/>
							</ThemeProvider>
							<button onClick={validateForm}>校 验</button>
						</div>
					</div>
				</div>
				// </VJSFThemeProvider>
				// </StyleThemeProvider>
			);
		};
	},
});
