/**
 * upfile 1.1v
 * The tinymce-plugins is used to upfile
 * 
 * https://github.com/Five-great/tinymce-plugins
 * 
 * Copyright 2020, Five(Li Hailong) The Chengdu, China https://www.fivecc.cn/
 *
 * Licensed under MIT
 */
tinymce.PluginManager.add('upfile', function(editor, url) {
	var pluginName='上传文件';
	window.upfile={}; //扔外部公共变量，也可以扔一个自定义的位置

	var baseURL=tinymce.baseURL||'.';
	var iframe1 = '/assets/js/tinymce/plugins/upfile/upfiles.html';
    upfile.file_callback = editor.getParam('file_callback', undefined, 'function');
	upfile.tinymce = tinymce;
    upfile.res={};
	var openDialog = function() {
		return editor.windowManager.openUrl({
	  title: pluginName,
      size: 'large',
      width: 450,
      height: 450,
			url:iframe1,
			buttons: [
				{
					type: 'cancel',
					text: 'Close'
				},
				{
					type: 'custom',
					text: 'Save',
					name: 'save',
					primary: true
				},
			],
			onAction: function (api, details) {
				switch (details.name) {
					case 'save':
						var res = upfile.res;
						var html = '<span  class="attachment" contenteditable="false"><a href="'+res.url+'" target="_blank" title="'+res.text+'" >'+res.text+'<a></span>';
						editor.insertContent(html);
						upfile.res={};
						api.close();
						break;
					default:
						break;
				}
				
			}
		});
	};

	editor.ui.registry.getAll().icons.upfile || editor.ui.registry.addIcon('upfile','<svg viewBox="0 0 1280 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M1126.2,779.8V87.6c0-24-22.6-86.9-83.5-86.9H83.5C14.7,0.7,0,63.7,0,87.7v692c0,36.2,29.2,89.7,83.5,89.7l959.3-1.3c51.7,0,83.5-42.5,83.5-88.3zm-1044,4V86.3h961.6V783.7H82.2v0.1z" fill="#53565A"/><path d="M603,461.6L521.1,366.3,313,629.8,227.2,546.8,102.4,716.8H972.8v-170L768.2,235.2,603.1,461.6zM284.6,358.4a105.4,105.4,0,0,0,73.5-30c19.5-19.1,30.3-45,30.2-71.8,0-56.8-45.9-103-102.4-103-56.6,0-102.4,46.1-102.4,103C183.4,313.5,228,358.4,284.6,358.4z" fill="#9598A0"/><path d="M1197.7,153.6l-0.3,669.3s13.5,113.9-67.4,113.9H153.6c0,24.1,23.9,87.2,83.5,87.2h959.3c58.3,0,83.6-49.5,83.6-89.9V240.8c-0.1-41.8-44.9-87.2-82.3-87.2z" fill="#53565A"/></svg>');
	
	editor.ui.registry.addButton('upfile', {
		icon: 'upfile',
    tooltip: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('upfile', {
		icon: 'upfile',
		text: '图片上传...',
		onAction: function() {
			openDialog();
		}
	});
	return {
		getMetadata: function() {
			return  {
				name: pluginName,
				url: "https://github.com/Five-great/tinymce-plugins",
			};
		}
	};
});
