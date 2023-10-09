/*
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-12 14:56:14
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-10-07 09:58:37
 * @FilePath: \vue3-json-schema-form\schema-test\schemaTest1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Ajv = require("ajv")
const addFormats = require('ajv-formats')
const ajv = new Ajv()
require("ajv-keywords")(ajv)// options can be passed, e.g. {allErrors: true}

addFormats(ajv)
ajv.addFormat("test", {
    type: "string",
    validate: (data) => {
        return data === 'lilith'
    },
})
ajv.addKeyword({
    keyword: "test",
    validate: (schema, data) => {
        console.log(schema, '===========', data)
    },

    errors: false,
})
const schema = {
    type: "object",
    properties: {
        constant: true,
        foo: { type: "string", format: "ipv4", test: "lilith" },
        addFormat: { type: "string", format: "test" },
        bar: { type: "string", regexp: { pattern: "bar", flags: "i" } },
    },
}
const validData = {
    foo: "192.168.0.1",
    bar: "Barmen",
    addFormat: 'lilith',
    even: 2,
    constant: 4
}

const validate = ajv.compile(schema);

const data = {
    foo: 1,
};
const valid = validate(validData);
if (!valid) console.log(validate.errors);
