<template>
	<div class="json-editor"><codemirror ref="editQuerySQL" v-model="code" :options="options" /></div>
</template>

<script>
/**
 * @author xuanzai
 * @description 代码预览
 */
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror';

export default {
	name: 'Codemirror',
	components: { codemirror },
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		height: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			code: '',
			options: {
				mode: 'text/x-java',
				lineNumbers: true,
				lint: true,
				lineWrapping: true,
				matchBrackets: true,
				tabSize: 2,
				cursorHeight: 0.9,
				theme: 'idea',
				readOnly: false,
				autoRefresh: true
			}
		};
	},
	watch: {
		value: {
			handler(val) {
				this.code = val;
			},
			immediate: true
		},
		code(val) {
			this.$emit("input", val)
		}
	},
	mounted() {
		this.initialStyle()
	},
	methods: {
		initialStyle() {
			this.$setStyle(
				document.querySelector(".CodeMirror-wrap"),
				'height',
				`${this.height}px`
			)
		}
	}
};
</script>

<style lang="scss" scoped>
.json-editor {
	height: 100%;
	margin-bottom: 10px;
}
.json-editor /deep/ .CodeMirror {
	font-size: 14px;
	overflow-y: auto;
	font-weight: normal;
}
.json-editor /deep/ .CodeMirror-scroll {
}
.json-editor /deep/ .cm-s-rubyblue span.cm-string {
	color: #f08047;
}
</style>
