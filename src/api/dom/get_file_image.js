// 选择文件获取图片url
function getImgFile(limit = 2) {
    return new Promise((resolve, reject) => {
        let
            reader = new FileReader(),
            pattern = new RegExp(/^image/),
            fileEle = document.createElement('input'),
            event = new MouseEvent('click'),
            data = {}
        fileEle.type = "file"
        fileEle.accept = "image/jpeg, image/png"
        fileEle.dispatchEvent(event)
        fileEle.addEventListener('change', () => {
            const files = fileEle.files[0]
            data.raw = files
            files.size / (1024 ** 2) > limit
            ? reject(`图片大小不能超过${limit}MB!`)
            : (pattern.test(files.type)
            ? reader.readAsDataURL(files)
            : reject('请选择图片!'))
        })
        reader.addEventListener('load', () => {
            data.url = reader.result
            resolve(data)
        })
    })
}

export default {
    getImgFile
}