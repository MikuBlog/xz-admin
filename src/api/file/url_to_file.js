/**
 * @description base64转file
 * @param {String} dataurl base64字符串
 * @param {String} filename 文件名称
 */
function dataUrlToFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename || 'file', {
		type: mime
	});
}

export default dataUrlToFile
