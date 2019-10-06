/**
 * @author xuanzai
 * @description 下载文件
 * @param {String} url 下载路径
 * @param {String} fileName 文件名称
 * @param {Boolean} isBlob 是否为二进制文件
 */
function download(url, fileName, isBlob) {
  const 
		ele = document.createElement('a'),
    event = new MouseEvent('click')
  ele.href = isBlob ? window.URL.createObjectURL(new Blob([url])) : url
  ele.download = fileName || ""
	ele.dispatchEvent(event)
}

export default download