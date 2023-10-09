<!--
 * @Author: 莫永金 mo.yongjin@byd.com
 * @Date: 2023-09-14 14:06:12
 * @LastEditors: 莫永金 mo.yongjin@byd.com
 * @LastEditTime: 2023-09-20 11:42:30
 * @FilePath: \vue3-json-schema-form\lib\fields\NumberField.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
	import { defineProps } from "vue";
	import { Schema, UISchema } from "../types";
	export interface Props {
		schema?: Schema;
		uiSchema?: UISchema;
		value: any;
		onChange: (v: any) => void;
		rootSchema: Schema;
		errorSchema: Schema;
	}
	const props = defineProps<Props>();
	const handleChange = (e: any) => {
		const value = e.target.value;
		const num = Number(value);
		if (Number.isNaN(num)) {
			props.onChange(undefined);
		} else {
			props.onChange(num);
		}
	};
</script>
