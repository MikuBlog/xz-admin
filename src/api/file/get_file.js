/**
 * @author xuanzai
 * @description 获取文件
 * @param {Number} limit 文件大小限制，默认为2MB
 * @returns {Promise}
 */
function getFile(limit = 2) {
  return new Promise((resolve, reject) => {
    let
      fileEle = document.createElement('input'),
      event = new MouseEvent('click')
    fileEle.type = "file"
    fileEle.addEventListener('change', () => {
      const files = fileEle.files[0]
      const raw = files
      files.size / (1024 ** 2) > limit
        ? reject(`文件不能超过${limit}MB!`)
        : resolve(raw)
    })
    fileEle.dispatchEvent(event)
  })
}

export default getFile