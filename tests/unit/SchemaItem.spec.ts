/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-11 15:16:25
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-25 17:36:21
 * @FilePath: \vue3-json-schema-form\tests\unit\example.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { mount } from "@vue/test-utils";
import { NumberFieldVue } from "../../lib";
import ThemeDefault from "../../lib/theme-default";
import TestComponent from "./utils/TestComponent";
describe("TestComponent", () => {
	it("should render correct number field", async () => {
		let value = "";
		const wrapper = mount(TestComponent, {
			props: {
				theme: ThemeDefault as any,
				schema: { type: "number" },
				rootSchema: { type: "number" },
				value: value,
				onChange: (v) => {
					value = v;
				},
			},
		});
		const NumberField = wrapper.findComponent(NumberFieldVue);
		expect(NumberField.exists()).toBeTruthy();
		// await NumberField.props("onChange")(123);
		const input = NumberField.find("input");
		input.element.value = "123";
		input.trigger("input");
		expect(value).toBe(123);
	});
});
