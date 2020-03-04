<template>
	<div class="tinymce"><textarea id="textarea"></textarea></div>
</template>

<script>
/**
 * @author xuanzai
 * @description tinymce富文本编辑器
 */
import convertHttp from '@/utils/convertHttp.js';
import plugins from './js/plugins';
import toolbar from './js/toolbar';
export default {
	name: 'Tinymce',
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
			default: 500
		},
		limit: {
			default: 500
		}
	},
	data() {
		return {
			tinymce: '',
			asyncInit: true
		};
	},
	watch: {
		value(val) {
			// 用于异步传值
			if (this.asyncInit && val && this.tinymce) {
				this.$nextTick(() => {
					this.asyncInit = false;
					this.tinymce.setContent(val);
				});
			}
			// 用于清空编辑器
			if (!val && this.tinymce) {
				this.$nextTick(() => {
					this.tinymce.setContent('');
				});
			}
		}
	},
	mounted() {
		this.initTinymce();
	},
	activated() {
		this.initTinymce();
	},
	destroyed() {
		this.removeTinymce();
	},
	deactivated() {
		this.removeTinymce();
	},
	methods: {
		removeTinymce() {
			this.$setStyle(document.querySelector('#textarea'), 'opacity', 0);
			this.tinymce.destroy();
		},
		initTinymce() {
			const _this = this;
			tinymce.init({
				selector: `#textarea`,
				language: 'zh_CN',
				language_url: '/assets/js/tinymce/language/zh_CN.js',
				plugins: plugins.plugins,
				external_plugins: plugins.external_plugins,
				toolbar,
				height: +this.height,
				ax_wordlimit_num: this.limit,
				ax_wordlimit_callback: function(editor, txt, num) {
					// 字数限制
				},
				file_picker_callback: function(callback, value, meta) {
					_this.$getFile(100).then(raw => {
						_this
							.$http_file({
								url: '/api/localStorage/upload',
								method: 'post',
								data: {
									file: raw
								}
							})
							.then(result => {
								callback(convertHttp(result.data.url));
							});
					});
				},
				images_upload_handler(blobInfo, success, failure, progress) {
					_this
						.$http_file({
							url: '/api/localStorage/upload',
							method: 'post',
							data: {
								file: blobInfo.blob()
							}
						})
						.then(result => {
							success(convertHttp(result.data.url));
						}).catch(e => {
							failure(e)
						});
				},
				init_instance_callback(editor) {
					_this.tinymce = editor;
					if (_this.value) {
						editor.setContent(_this.value);
					}
					editor.on('NodeChange Change KeyUp SetContent', () => {
						_this.$emit('input', editor.getContent());
					});
				}
			});
		}
	}
};
</script>
