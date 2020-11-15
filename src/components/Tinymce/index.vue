<template>
	<div class="tinymce"><textarea :id="randomId"></textarea></div>
</template>

<script>
/**
 * @author xuanzai
 * @description tinymce富文本编辑器
 */
import convertHttp from '@/utils/convertHttp.js';
import plugins from './js/plugins';
import toolbar from './js/toolbar';
const environment = require('../../../public_path').editor
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
			default: 700
		},
		limit: {
			default: 500
		}
	},
	data() {
		return {
			tinymce: '',
      asyncInit: true,
      randomId: new Date().getTime()
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
    getSketch() {
      const editBody = this.tinymce.getBody();
      this.tinymce.selection.select(editBody);
      return this.tinymce.selection.getContent({ format: 'text' })
    },
    getImageLinkList() {
      var data = [];
      this.tinymce.getContent().replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
        data.push(capture);
      });
      return data
    },
    getVideoList() {
      var data = [];
      this.tinymce.getContent().replace(/<video [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
        data.push(capture);
      });
      return data
    },
		removeTinymce() {
			this.tinymce.destroy();
		},
		initTinymce() {
			const _this = this;
			tinymce.init({
				selector: `#${this.randomId}`,
				language: 'zh_CN',
				language_url: `${environment}assets/js/tinymce/language/zh_CN.js`,
				plugins: plugins.plugins,
				external_plugins: plugins.external_plugins,
				toolbar,
				height: +this.height,
				ax_wordlimit_num: 1,
				branding: false,
				elementpath: false,
				contextmenu: "bold copy italic underline lineheight forecolor backcolor strikethrough",
				fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 56pt 72pt 84pt 96pt 108pt",
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
            _this.asyncInit = false;
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
