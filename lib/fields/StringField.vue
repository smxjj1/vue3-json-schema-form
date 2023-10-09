<!--
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-14 10:57:31
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-18 20:01:18
 * @FilePath: \vue3-json-schema-form\lib\fields\StringField.vue
 * @Description: 设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
	import { defineProps } from "vue";
	import { Schema, UISchema } from "../types";
	interface Props {
		schema?: Schema;
		uiSchema?: UISchema;
		value: any;
		onChange: (v: any) => void;
		rootSchema: Schema;
		errorSchema: Schema;
	}

	const props = defineProps<Props>();
	const handleChange = (e: any) => {
		console.log(e);
		props.onChange(e.target.value);
	};
</script>
