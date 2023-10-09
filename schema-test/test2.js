/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-12 17:28:46
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 11:05:49
 * @FilePath: \vue3-json-schema-form\schema-test\test2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-keywords")(ajv); // options can be passed, e.g. {allErrors: true}

ajv.addKeyword({
	keyword: "even",
	type: "number",
	schemaType: "boolean",
	// $data: true // to support [$data reference](./guide/combining-schemas.md#data-reference), ...
	code(cxt) {
		const { data, schema } = cxt;
		return true // ... the only code change needed is to use `cxt.fail$data` here
	},
});

const schema = { even: true };
const validate = ajv.compile(schema);
console.log(validate(2)); // true
console.log(validate(3)); // false
