<template>
	<div class="tinymce"><textarea id="text"></textarea></div>
</template>

<script>
/**
 * @author xuanzai
 * @description Tinymce富文本编辑器
 */
import plugins from './js/plugins';
import toolbar from './js/toolbar';
export default {
	model: {
		prop: "value",
		event: "input"
	},
	props: {
		value: {
			type: String,
			default: ""
		},
		height: {
			type: Number,
			default: 500
		}
	},
	watch: {
		value: {
			handler(val) {
				setTimeout(() => {
					tinymce.get("text").setContent(val)
				})
			}
		}
	},
	created() {
		const _this = this;
		tinymce.init({
			plugins,
			toolbar,
			selector: '#text',
			language: 'zh_CN',
			height: this.height,
			images_upload_handler(blobInfo, success, failure, progress) {
				_this
					.$http_file({
						url: '',
						method: 'post',
						data: {
							file: blobInfo.blob()
						}
					})
					.then(result => {
						success(result.value);
						progress(100);
					});
			},
			init_instance_callback(editor) {
				if(_this.value) {
					editor.setContent(_this.value)
				}
				editor.on('NodeChange Change KeyUp SetContent', () => {
					_this.$emit('input', editor.getContent());
				});
			}
		});
	}
};
</script>

<style></style>
