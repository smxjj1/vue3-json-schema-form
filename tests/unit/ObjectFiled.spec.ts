/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-21 10:31:21
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-25 12:08:28
 * @FilePath: \vue3-json-schema-form\tests\unit\ObjectFiled.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { mount } from "@vue/test-utils";
import { NumberFieldVue, StringFieldVue } from "../../lib";
import ThemeDefault from "../../lib/theme-default";
import TestComponent from "./utils/TestComponent";
describe("ObjectFiled", () => {
	let schema: any;
	let rootSchema: any;
	let value: any;
	beforeEach(() => {
		value = 123123;
		schema = {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				age: {
					type: "number",
				},
			},
		};
		rootSchema = {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				age: {
					type: "number",
				},
			},
		};
	});
	it("should render properties to correct fileds", () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: schema,
				rootSchema,
				value: {},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const NumberField = wrapper.findComponent(NumberFieldVue);
		expect(NumberField.exists()).toBeTruthy();
		const StringField = wrapper.findComponent(StringFieldVue);
		expect(StringField.exists()).toBeTruthy();
	});
	it("should change value when sub fields trigger onChange", () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: schema,
				rootSchema,
				value: {},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const NumberField = wrapper.findComponent(NumberFieldVue);
		const StringField = wrapper.findComponent(StringFieldVue);
		const inputNum = NumberField.find("input");
		inputNum.element.value = "2312";
		inputNum.trigger("input");
		expect(value.age).toEqual(2312);
		const inputStr = StringField.find("input");
		inputStr.element.value = "lilith";
		inputStr.trigger("input");
		expect(value.name).toEqual("lilith");
	});
	it("should delete value[key] when props value[key] as undefined", async () => {
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: schema,
				rootSchema,
				value: {},
				onChange: (v) => {
					value = v;
				},
			},
		});
		const NumberField = wrapper.findComponent(NumberFieldVue);
		const StringField = wrapper.findComponent(StringFieldVue);
		const inputNum = NumberField.find("input");
		inputNum.element.value = undefined;
		inputNum.trigger("input");
		expect(value.age).toBe(0);
		await StringField.props("onChange")(undefined);
		expect(value.name).toBeUndefined();
	});
	it("should change value to object when props value is not object", async () => {
		schema = {
			type: "object",
			properties: "",
		};
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: schema,
				rootSchema,
				value,
				onChange: (v) => {
					value = v;
				},
			},
		});
		expect(wrapper.props("schema")).toEqual({
			type: "object",
			properties: "",
		});
	});
});
