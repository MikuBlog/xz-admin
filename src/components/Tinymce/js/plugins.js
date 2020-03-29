const environment = require('../../../../public_path').editor
export default {
	plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
	external_plugins: {
		'powerpaste': `${environment}assets/js/tinymce/plugins/powerpaste/plugin.min.js`,
		'axupimgs': `${environment}assets/js/tinymce/plugins/axupimgs/plugin.min.js`,
		'ax_wordlimit': `${environment}assets/js/tinymce/plugins/ax_wordlimit/plugin.min.js`,
	}
}
