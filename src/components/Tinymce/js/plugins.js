const environment = require('../../../../public_path').editor
export default {
	plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount help save lineheight bdmap imagetools table'],
	external_plugins: {
		'powerpaste': `${environment}assets/js/tinymce/plugins/powerpaste/plugin.min.js`,
		'axupimgs': `${environment}assets/js/tinymce/plugins/axupimgs/plugin.min.js`,
		'ax_wordlimit': `${environment}assets/js/tinymce/plugins/ax_wordlimit/plugin.min.js`,
		'lineheight': `${environment}assets/js/tinymce/plugins/lineheight/plugin.min.js`,
		'bdmap': `${environment}assets/js/tinymce/plugins/bdmap/plugin.min.js`,
		'imagetools': `${environment}assets/js/tinymce/plugins/imagetools/plugin.min.js`,
		'table': `${environment}assets/js/tinymce/plugins/table/plugin.min.js`,
		'indent2em': `${environment}assets/js/tinymce/plugins/indent2em/plugin.min.js`,
		'letterspacing': `${environment}assets/js/tinymce/plugins/letterspacing/plugin.min.js`,
		'layout': `${environment}assets/js/tinymce/plugins/layout/plugin.min.js`,
		'importword': `${environment}assets/js/tinymce/plugins/importword/plugin.min.js`,
		'upfile': `${environment}assets/js/tinymce/plugins/upfile/plugin.min.js`,
		'autosave': `${environment}assets/js/tinymce/plugins/autosave/plugin.min.js`,
		'paste': `${environment}assets/js/tinymce/plugins/paste/plugin.min.js`,
		'preview': `${environment}assets/js/tinymce/plugins/preview/plugin.min.js`,
		'media': `${environment}assets/js/tinymce/plugins/media/plugin.min.js`,
		'image': `${environment}assets/js/tinymce/plugins/image/plugin.min.js`,
		'code': `${environment}assets/js/tinymce/plugins/code/plugin.min.js`,
		'colorpicker': `${environment}assets/js/tinymce/plugins/colorpicker/plugin.min.js`,
		'codesample': `${environment}assets/js/tinymce/plugins/codesample/plugin.min.js`,
		'emoticons': `${environment}assets/js/tinymce/plugins/emoticons/plugin.min.js`,
		'emojis': `${environment}assets/js/tinymce/plugins/emojis/plugin.min.js`
	}
}
