/**
 * @author xuanzai
 * @description 下载文件
 * @param {String} url 下载路径
 * @param {String} name 文件名称
 * @param {Boolean} isBlob 是否为二进制文件
 */
function download(url, name, isBlob) {
    const 
		ele = document.createElement('a'),
		event = new MouseEvent('click')
  ele.href = isBlob ? window.URL.createObjectURL(new Blob([url])) : url
  ele.download = name || ""
	ele.dispatchEvent(event)
}

export default download