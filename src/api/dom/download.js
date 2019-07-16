/**
 * @description 下载文件
 * @param {String} url 下载路径
 */
function download(url) {
    const 
		ele = document.createElement('a'),
		event = new MouseEvent('click')
	ele.href = url
	ele.dispatchEvent(event)
}

export default {
    download
}