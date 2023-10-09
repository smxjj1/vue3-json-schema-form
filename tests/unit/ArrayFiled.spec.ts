/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-21 15:30:49
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-25 17:34:30
 * @FilePath: \vue3-json-schema-form\tests\unit\ArrayFiled.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { mount } from "@vue/test-utils";
import {
	NumberFieldVue,
	StringFieldVue,
	ArrayFiled,
	SelectionWidget,
	ArrayItemWrapper,
	SchemaItem,
} from "../../lib";
import TestComponent from "./utils/TestComponent";
import ThemeDefault from "../../lib/theme-default";
describe("TestComponent", () => {
	let value: any;
	beforeEach(() => {
		value = ["1", "2"];
	});
	it("it should render multi type", () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: {
					type: "array",
					items: [
						{
							type: "string",
						},
						{
							type: "number",
						},
					],
				},
				value: [],
				rootSchema: {
					type: "array",
					items: [
						{
							type: "string",
						},
						{
							type: "number",
						},
					],
				},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const arrayFiled = wrapper.findComponent(ArrayFiled);
		const NumberField = arrayFiled.findComponent(NumberFieldVue);
		const StringField = arrayFiled.findComponent(StringFieldVue);
		expect(StringField.exists()).toBeTruthy();
		expect(NumberField.exists()).toBeTruthy();
	});

	it("it should render single string input type", async () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: {
					type: "array",
					items: {
						type: "string",
					},
				},
				value,
				rootSchema: {
					type: "array",
					items: {
						type: "string",
					},
				},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const arrayFiled = wrapper.findComponent(ArrayFiled);
		const StringFields = arrayFiled.findAllComponents(StringFieldVue);
		expect(StringFields.length).toBe(2);
		expect(StringFields[0].props("value")).toBe("1");
		await StringFields[0].props("onChange")("lilith");
		expect(value[0]).toBe("lilith");
	});
	it("it should render multiSelectArray type   ", async () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: {
					type: "array",
					items: {
						type: "string",
						enum: ["111", "2222", "3111"],
					},
				},
				value,
				rootSchema: {
					type: "array",
					items: {
						type: "string",
					},
				},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const arrayFiled = wrapper.findComponent(ArrayFiled);
		const Selection = arrayFiled.findComponent(SelectionWidget);
		// expect(Selection.exists()).toBeTruthy();
	});
	it("it should render ArrayItemWrapper", async () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: {
								type: "string",
							},
							age: {
								type: "number",
							},
						},
					},
				},
				value,
				rootSchema: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: {
								type: "string",
							},
							age: {
								type: "number",
							},
						},
					},
				},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const arrayFiled = wrapper.findComponent(ArrayFiled);
		const ArrayItemWrapperComp = arrayFiled.findComponent(ArrayItemWrapper);
		expect(ArrayItemWrapperComp.exists()).toBeTruthy();
		await ArrayItemWrapperComp.props("onButtonClick")("add", 0);
		const SchemaItems = ArrayItemWrapperComp.findAllComponents(SchemaItem);
		expect(SchemaItems.length).toBe(3);
	});
});
